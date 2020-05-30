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
const noSessionForJwt = passport.authenticate("jwt", { session: false });

router.post("/register", register);
router.get("/github", github);
router.get("/github/callback", githubCallback, setUserWithToken);
router.post("/login", noSessionForLocal, login, setUserWithToken);
router.get("/current_user", noSessionForJwt, currentUser);
router.get("/logout", logout);
router.get("/test", test);

export default router;
