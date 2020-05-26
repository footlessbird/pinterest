import { Router } from "express";
import passport from "passport";
import handle from "../handlers";

const router = Router();

// router.get("/github", passport.authenticate("github"));
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
});

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.post("/register", handle.register);
router.get("/current_user", handle.currentUser);
router.get("/logout", handle.logout);

export default router;
