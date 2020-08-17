import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import User from "../models/user";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

passport.use(
  // payload from "const token = jwt.sign({ id: userId }, process.env.SECRET, "
  // assuming "jwt.sign({id: userId})" registerd in the payload object
  new JwtStrategy(jwtOptions, async function (payload, done) {
    console.log("jwt payload", payload);

    try {
      const user = await User.findById(payload.id);
      if (!user) {
        return done(null, false, { message: "We could not find the user." });
      }
      if (user) done(null, user);
    } catch (err) {
      throw new Error(err);
    }
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      console.log("email from the client", email);
      console.log("password from the client", password);
      try {
        const user = await User.findOne({ email: email });
        if (!user)
          return done(null, false, {
            message: "Incorrect email account or password.",
          });
        // This password validation logic should be replaced with User's member function soon
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
          return done(null, false, {
            message: "Incorrect email account or password.",
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
