"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var handlers_1 = __importDefault(require("../handlers"));
var router = express_1.Router();
var noSessionForJwt = passport_1.default.authenticate("jwt", { session: false });
var createPin = handlers_1.default.createPin, getPins = handlers_1.default.getPins, save = handlers_1.default.save, usersPins = handlers_1.default.usersPins, deletePin = handlers_1.default.deletePin;
router.route("/").get(getPins).post(noSessionForJwt, createPin);
router.get("/user", noSessionForJwt, usersPins);
router
    .route("/:id")
    .post(noSessionForJwt, save)
    .delete(noSessionForJwt, deletePin);
exports.default = router;
