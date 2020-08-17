import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";
import passport from "passport";

import handle from "../handlers";
import setUserWithToken from "../middlewares/generateAuthToken";

const router = Router();
const {
  test,
  register,
  login,
  github,
  githubCallback,
  logout,
  currentUser,
} = handle;

const noSessionForLocal = passport.authenticate("local", { session: false });
/*
const noSessionForLocal = passport.authenticate(
  "local",
  { session: false }
  // (err, user, options) => console.log("noSessionForLocal error", options)
);
*/
const noSessionForJwt = passport.authenticate("jwt", { session: false });

router.post("/register", register);
router.get("/github", github);
// router.get("/github_callback", githubCallback);
// router.post("/github_callback", githubCallback);
router.post("/github_callback", githubCallback, setUserWithToken);
// router.post("/login", noSessionForLocal, login, setUserWithToken);
router.post("/login", login, setUserWithToken);
router.get("/current_user", noSessionForJwt, currentUser);
router.get("/logout", logout);
router.get("/test", test);

export default router;
