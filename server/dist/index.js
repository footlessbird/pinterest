"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
require("./models");
var passport_1 = __importDefault(require("passport"));
require("./services/passport");
var routes_1 = __importDefault(require("./routes"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(morgan_1.default("combined"));
app.use(cors_1.default());
app.use(passport_1.default.initialize());
// app.use(passport.session());
app.get("/", function (req, res) {
    res.json({
        hello: "pinterest clone server",
    });
});
app.use("/api/auth", routes_1.default.auth);
app.use("/api/pins", routes_1.default.pin);
if (process.env.NODE_ENV === "production") {
    // app.use(express.static(clientBuildDir));
    app.use(express_1.default.static(path_1.default.join(__dirname, "/../../client/build")));
    console.log("production logic");
    app.get("*", function (req, res) {
        res.sendFile(path_1.default.join(__dirname, "/../../client/build", "index.html"));
        // res.sendFile(path.resolve(clientBuildDir, "index.html"));
    });
}
app.listen(PORT, function () {
    console.log("app is running on port " + PORT);
});
