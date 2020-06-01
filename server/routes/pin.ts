import { Router } from "express";
import passport from "passport";

import handle from "../handlers";

const router = Router();
const noSessionForJwt = passport.authenticate("jwt", { session: false });

const { createPin, getPins } = handle;

router.route("/").get(getPins).post(noSessionForJwt, createPin);

export default router;
