"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pin_1 = __importDefault(require("../models/pin"));
var createPin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, imgLink, imgDescription, user, newPin, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, imgLink = _a.imgLink, imgDescription = _a.imgDescription;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                user = req.user;
                return [4 /*yield*/, pin_1.default.create({
                        user: user,
                        imgLink: imgLink,
                        imgDescription: imgDescription,
                    })];
            case 2:
                newPin = _b.sent();
                user.pins.push(newPin.id); // this logic will be removed in future
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, res.status(201).json(newPin)];
            case 4:
                err_1 = _b.sent();
                return [2 /*return*/, next({
                        status: 400,
                        message: err_1.message,
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getPins = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var lastOneId, firstPins, pins, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.query.lastOneId === "") {
                    lastOneId = null;
                }
                else {
                    lastOneId = req.query.lastOneId;
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!(lastOneId === null || lastOneId === undefined || lastOneId === "")) return [3 /*break*/, 3];
                return [4 /*yield*/, pin_1.default.find({})
                        .sort({ _id: -1 })
                        .limit(10)
                        .populate("user", ["id", "username"])];
            case 2:
                firstPins = _a.sent();
                // console.log("first pins sending", firstPins);
                return [2 /*return*/, res.status(200).json(firstPins)];
            case 3: return [4 /*yield*/, pin_1.default.find({ _id: { $lt: lastOneId } })
                    .sort({ _id: -1 })
                    .limit(10)
                    .populate("user", ["id", "username"])];
            case 4:
                pins = _a.sent();
                // console.log("after first pins", pins);
                return [2 /*return*/, res.status(200).json(pins)];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_2 = _a.sent();
                console.error(err_2);
                return [2 /*return*/, next({
                        status: 400,
                        message: err_2.message,
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
var save = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pinId, userId, pin, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pinId = req.params.id.toString();
                userId = req.user._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, pin_1.default.findById(pinId)];
            case 2:
                pin = _a.sent();
                if (pin.user.equals(req.user._id)) {
                    return [2 /*return*/, res.status(400).json({ message: "Cannot pin your own." })];
                }
                if (!!pin.savedBy[req.user._id]) return [3 /*break*/, 4];
                pin.savedBy[req.user._id] = true;
                pin.markModified("savedBy");
                return [4 /*yield*/, pin.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json(pin)];
            case 4:
                res.status(400).json({ message: "Already pinned." });
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_3 = _a.sent();
                return [2 /*return*/, next({
                        status: 400,
                        message: err_3.message,
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
var deletePin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var thisUser, pinId, pin, savedBy, savedByThisUser, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                thisUser = req.user.id;
                pinId = req.params.id.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, pin_1.default.findById(pinId)];
            case 2:
                pin = _a.sent();
                if (!pin)
                    throw new Error("No pin found.");
                if (!pin.user.equals(req.user._id)) return [3 /*break*/, 4];
                return [4 /*yield*/, pin.remove()];
            case 3:
                _a.sent();
                return [2 /*return*/, res
                        .status(200)
                        .json({ message: "Pin has been successfully deleted.", pinId: pinId })];
            case 4:
                savedBy = Object.keys(pin.savedBy);
                savedByThisUser = savedBy && savedBy.includes(thisUser);
                if (!savedByThisUser) return [3 /*break*/, 6];
                delete pin.savedBy[thisUser];
                pin.markModified("savedBy");
                return [4 /*yield*/, pin.save()];
            case 5:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "Your saved pin successfully deleted.",
                        pinId: pinId,
                    })];
            case 6: throw new Error("Not authorized.");
            case 7: return [3 /*break*/, 9];
            case 8:
                err_4 = _a.sent();
                return [2 /*return*/, next({
                        status: 400,
                        message: err_4.message,
                    })];
            case 9: return [2 /*return*/];
        }
    });
}); };
var usersPins = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, condition, pins, err_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.user._id;
                condition = "savedBy." + userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pin_1.default.find({
                        $or: [(_a = {}, _a[condition] = { $exists: true }, _a), { user: userId }],
                    }).populate("user", ["id", "username"])];
            case 2:
                pins = _b.sent();
                return [2 /*return*/, res.status(200).json(pins)];
            case 3:
                err_5 = _b.sent();
                return [2 /*return*/, next({
                        status: 400,
                        message: err_5.message,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = { createPin: createPin, getPins: getPins, save: save, usersPins: usersPins, deletePin: deletePin };
