import express from "express";
import morgan from "morgan";
import cors from "cors";
import "./models";
import passport from "passport";
import "./services/passport";
import routes from "./routes";
import path from "path";

export type TRequest = {
  [key: string]: any;
};

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(cors());

app.use(passport.initialize());
// app.use(passport.session());

app.get("/", (req, res) => {
  res.json({
    hello: "pinterest clone server",
  });
});

app.use("/api/auth", routes.auth);
app.use("/api/pins", routes.pin);

if (process.env.NODE_ENV === "production") {
  // app.use(express.static(clientBuildDir));

  app.use(express.static(path.join(__dirname, "/../../client/build")));
  console.log("production logic");

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../../client/build", "index.html"));
    // res.sendFile(path.resolve(clientBuildDir, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
