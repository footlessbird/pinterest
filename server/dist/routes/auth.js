"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var handlers_1 = __importDefault(require("../handlers"));
var generateAuthToken_1 = __importDefault(require("../middlewares/generateAuthToken"));
var router = express_1.Router();
var test = handlers_1.default.test, register = handlers_1.default.register, login = handlers_1.default.login, github = handlers_1.default.github, githubCallback = handlers_1.default.githubCallback, logout = handlers_1.default.logout, currentUser = handlers_1.default.currentUser;
var noSessionForLocal = passport_1.default.authenticate("local", { session: false });
/*
const noSessionForLocal = passport.authenticate(
  "local",
  { session: false }
  // (err, user, options) => console.log("noSessionForLocal error", options)
);
*/
var noSessionForJwt = passport_1.default.authenticate("jwt", { session: false });
router.post("/register", register);
router.get("/github", github);
// router.get("/github_callback", githubCallback);
// router.post("/github_callback", githubCallback);
router.post("/github_callback", githubCallback, generateAuthToken_1.default);
// router.post("/login", noSessionForLocal, login, setUserWithToken);
router.post("/login", login, generateAuthToken_1.default);
router.get("/current_user", noSessionForJwt, currentUser);
router.get("/logout", logout);
router.get("/test", test);
exports.default = router;
