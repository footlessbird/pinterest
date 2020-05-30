import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";
import passport from "passport";
import axios from "axios";

import handle from "../handlers";
import User from "../models/user";
import { TRequest } from "../index";
import setUserWithToken from "../middlewares/generateAuthToken";

const router = Router();
const { currentUser, login, register, logout, test } = handle;

const noSessionForLocal = passport.authenticate("local", { session: false });
const noSessionForJwt = passport.authenticate("jwt", { session: false });

/*
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
*/

/*
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);*/

router.get("/github", (req: TRequest, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}`
  );
});

router.get(
  "/github/callback",
  async function (req: TRequest, res, next) {
    // console.log("code??", req.query.code);
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: req.query.code,
    };
    const opts = { headers: { accept: "application/json" } };

    const getAccessToken = await axios.post(
      `https://github.com/login/oauth/access_token`,
      body,
      opts
    );
    const { access_token } = getAccessToken.data;
    console.log("token??", access_token);

    const uri = `https://api.github.com/user`;
    const auth = `bearer ${access_token}`;

    async function getUserData() {
      try {
        const userData = await axios.get(uri, {
          headers: {
            Authorization: auth,
          },
        });
        // console.log(userData);
        return userData.data;
      } catch (err) {
        throw new Error(err);
      }
    }

    const userData = await getUserData();
    // console.log("user??", userData);
    const { login, id, email } = userData;

    try {
      // check whether the user in the db or not
      const existingUser = await User.findOne({ githubId: id });
      if (existingUser) {
        req.user = existingUser;
        next();
      } else {
        // store into mongodb
        const newUser = await new User({
          githubId: id,
          email,
          username: login,
        }).save();
        req.user = newUser;
        next();
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  setUserWithToken
);

router.get("/current_user", noSessionForJwt, currentUser);
router.post("/login", noSessionForLocal, login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/test", test);

export default router;
