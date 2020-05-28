import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/user";

/*
passport.serializeUser((user, done) => {
  done(null, user.id);
  console.log("serializedUser id ", user.id);
  console.log("serializeUser", user);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserializeUser run");
  const user = await User.findById(id);
  console.log("user is ", user);
  done(null, user);
  console.log("deserializeUser", user);
});
*/

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email: email });
        if (!user)
          return done(null, false, { message: "We could not find the user." });
        // This password validation logic should be replaced with User's member function soon
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
          return done(null, false, {
            message: "Please type correct password.",
          });
        } else {
          return done(null, user);
        }
      } catch (err) {
        console.error(err);
        return done(err);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // console.log(profile);
        const existingUser = await User.findOne({ githubId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        } else {
          // store into mongodb
          const newUser = await new User({
            githubId: profile.id,
            email: profile._json.email,
            username: profile.username,
          }).save();
          return done(null, newUser);
        }
      } catch (err) {
        console.error("GitHubStrategy error", err);
        return done(err);
      }
    }
  )
);
