import { Router } from "express";
import passport from "passport";
import handle from "../handlers";

const router = Router();
const { currentUser, login, register, logout, test } = handle;

const noSessionForLocal = passport.authenticate("local", { session: false });
const noSessionForJwt = passport.authenticate("jwt", { session: false });

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.get("/current_user", noSessionForJwt, currentUser);
router.post("/login", noSessionForLocal, login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/test", test);

export default router;
