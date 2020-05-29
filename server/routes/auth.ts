import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";
import passport from "passport";
import axios from "axios";

import handle from "../handlers";

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

router.get("/github", (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}`
  );
});

router.get("/github/callback", async function (req, res) {
  // console.log("code??", req.query.code);
  let token = null;
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: req.query.code,
  };
  const opts = { headers: { accept: "application/json" } };

  const dataFromGit = await axios.post(
    `https://github.com/login/oauth/access_token`,
    body,
    opts
  );
  const { access_token } = dataFromGit.data;
  console.log("token??", access_token);

  const uri = `https://api.github.com/user?access_token=${access_token}`;
  try {
    const fetchingData = await axios.get(uri);
    console.log("fetchingData??", fetchingData);
  } catch (err) {
    throw new Error(err);
  }
});

router.get("/current_user", noSessionForJwt, currentUser);
router.post("/login", noSessionForLocal, login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/test", test);

export default router;
