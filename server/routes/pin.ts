import { Router } from "express";
import passport from "passport";

import handle from "../handlers";

const router = Router();
const noSessionForJwt = passport.authenticate("jwt", { session: false });

const { createPin, getPins, save, usersPins, deletePin } = handle;

router.route("/").get(getPins).post(noSessionForJwt, createPin);

router.get("/user", noSessionForJwt, usersPins);

router
  .route("/:id")
  .post(noSessionForJwt, save)
  .delete(noSessionForJwt, deletePin);

export default router;
