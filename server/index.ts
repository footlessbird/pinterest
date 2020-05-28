import express from "express";
import "./models/db";
import passport from "passport";
import "./services/passport";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

// app.use(passport.session());

app.get("/", (req, res) => {
  res.json({
    hello: "pinterest clone server",
  });
});

app.use("/auth", routes.auth);

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
