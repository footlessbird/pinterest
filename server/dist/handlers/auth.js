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
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var axios_1 = __importDefault(require("axios"));
var user_1 = __importDefault(require("../models/user"));
var currentUser = function (req, res, next) {
    // console.log("currentUser called");
    // console.log("current_user ", req.user);
    // res.send(req.user);
    res.json(req.user);
};
var logout = function (req, res) {
    req.logout();
    res.redirect("/");
};
var github = function (req, res) {
    // console.log("***back-end github api called***");
    var clientId = process.env.GITHUB_CLIENT_ID;
    res.redirect("https://github.com/login/oauth/authorize?client_id=" + clientId);
    /*
    const url = "https://github.com/login/oauth/authorize?";
    const query = qs.stringify({
      client_id: clientId,
      redirect_uri: process.env.GITHUB_CALLBACK_URL,
    });
    const githubAuthUrl = url + query;
    res.send(githubAuthUrl);
    */
};
var githubCallback = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    function getUserData() {
        return __awaiter(this, void 0, void 0, function () {
            var userData_1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(uri, {
                                headers: {
                                    Authorization: auth,
                                },
                            })];
                    case 1:
                        userData_1 = _a.sent();
                        // console.log(userData);
                        return [2 /*return*/, userData_1.data];
                    case 2:
                        err_2 = _a.sent();
                        throw new Error(err_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    var body, opts, getAccessToken, access_token, uri, auth, userData, login, id, email, existingUser, newUser, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code: req.body.githubCode,
                };
                opts = { headers: { accept: "application/json" } };
                return [4 /*yield*/, axios_1.default.post("https://github.com/login/oauth/access_token", body, opts)];
            case 1:
                getAccessToken = _a.sent();
                access_token = getAccessToken.data.access_token;
                uri = "https://api.github.com/user";
                auth = "bearer " + access_token;
                return [4 /*yield*/, getUserData()];
            case 2:
                userData = _a.sent();
                login = userData.login, id = userData.id, email = userData.email;
                _a.label = 3;
            case 3:
                _a.trys.push([3, 8, , 9]);
                return [4 /*yield*/, user_1.default.findOne({ githubId: id })];
            case 4:
                existingUser = _a.sent();
                if (!existingUser) return [3 /*break*/, 5];
                req.user = existingUser;
                next();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, new user_1.default({
                    githubId: id,
                    email: email,
                    username: login,
                }).save()];
            case 6:
                newUser = _a.sent();
                req.user = newUser;
                next();
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                err_1 = _a.sent();
                // console.log(err);
                next(err_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
/*
app.get('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});
*/
// local login
var login = function (req, res, next) {
    // console.log("login handler called");
    // const user = req.user;
    // if (!user) return res.status(400).send({ message: "User does not exist." });
    next();
};
/*
const login = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    // if (err) { return next(err); }
    // if (!user) { return res.redirect('/login'); }
    // req.logIn(user, function(err) {
    //   if (err) { return next(err); }
    //   return res.redirect('/users/' + user.username);
    // });
    console.log("login err", err);
    console.log("login user", user.id);
    console.log("login info", info);
    // req.user = user;
    if (info) return res.status(422).send({ message: info.message });

    // next();
  })(req, res, next);
};
*/
var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, username, password, existingUser, newUser, savedUser, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, username = _a.username, password = _a.password;
                if (!email || !password)
                    return [2 /*return*/, res
                            .status(422)
                            .send({ message: "Please provide email and password" })];
                return [4 /*yield*/, user_1.default.findOne({ email: email })];
            case 1:
                existingUser = _b.sent();
                if (existingUser)
                    return [2 /*return*/, res.status(422).send({ message: "Email is already in use." })];
                newUser = new user_1.default({
                    email: email,
                    username: username,
                    password: password,
                });
                return [4 /*yield*/, newUser.save()];
            case 2:
                savedUser = _b.sent();
                if (!savedUser)
                    throw new Error("Something went wrong to save the user.");
                // const token = jwt.sign({ id: savedUser.id }, process.env.SECRET);
                return [2 /*return*/, res.status(200).json({
                        // token,
                        user: {
                            id: savedUser.id,
                            email: savedUser.email,
                            username: savedUser.username,
                        },
                    })];
            case 3:
                err_3 = _b.sent();
                return [2 /*return*/, next({
                        status: 400,
                        message: err_3.message,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var test = function (req, res) {
    res.json({
        test: "auth route test",
    });
};
exports.default = {
    currentUser: currentUser,
    logout: logout,
    register: register,
    login: login,
    github: github,
    githubCallback: githubCallback,
    test: test,
};
