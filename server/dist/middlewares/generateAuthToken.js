"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var passport_1 = __importDefault(require("passport"));
function getJwt(userId) {
    var token = jsonwebtoken_1.default.sign({ id: userId }, process.env.SECRET, {
        expiresIn: 3600,
    });
    if (!token)
        throw new Error("JWT sign error");
    return token;
}
// export default function setUserWithToken(req, res) {
//   console.log("setUserWithToken user", req.user);
//   const token = getJwt(req.user.id);
//   const { id, email, username } = req.user;
//   return res.status(200).json({
//     token,
//     user: {
//       id,
//       email,
//       username,
//     },
//   });
// }
function setUserWithToken(req, res, next) {
    // console.log("setUserWithToken req.user", req.user);
    passport_1.default.authenticate("local", function (err, user, info) {
        if (req.user) {
            var token = getJwt(req.user.id);
            var _a = req.user, id = _a.id, email = _a.email, username = _a.username;
            return res.status(200).json({
                token: token,
                user: {
                    id: id,
                    email: email,
                    username: username,
                },
            });
        }
        else {
            // console.log("setUserWithToken user", user);
            // console.log("setUserWithToken info", info);
            var token = getJwt(user.id);
            var id = user.id, email = user.email, username = user.username;
            // console.log(id, email, username);
            if (info) {
                return res.status(400).send({ message: info.message });
            }
            else {
                return res.status(200).json({
                    token: token,
                    user: {
                        id: id,
                        email: email,
                        username: username,
                    },
                });
            }
        }
    })(req, res, next);
}
exports.default = setUserWithToken;
