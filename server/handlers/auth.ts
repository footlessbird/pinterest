import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

import User from "../models/user";

const currentUser = (req, res, next) => {
  console.log("currentUser called");
  console.log("current_user ", req.user);
  // res.send(req.user);
  res.json(req.user);
};

const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

const github = (req, res) => {
  console.log("back-end github api called");
  const clientId = process.env.GITHUB_CLIENT_ID;
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}`
  );
};

const githubCallback = async (req, res, next) => {
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: req.query.code,
  };
  const opts = { headers: { accept: "application/json" } };

  const getAccessToken = await axios.post(
    `https://github.com/login/oauth/access_token`,
    body,
    opts
  );
  const { access_token } = getAccessToken.data;
  console.log("token??", access_token);

  const uri = `https://api.github.com/user`;
  const auth = `bearer ${access_token}`;

  async function getUserData() {
    try {
      const userData = await axios.get(uri, {
        headers: {
          Authorization: auth,
        },
      });
      // console.log(userData);
      return userData.data;
    } catch (err) {
      throw new Error(err);
    }
  }

  const userData = await getUserData();
  // console.log("user??", userData);
  const { login, id, email } = userData;

  try {
    // check whether the user in the db or not
    const existingUser = await User.findOne({ githubId: id });
    if (existingUser) {
      req.user = existingUser;
      next();
    } else {
      // store into mongodb
      const newUser = await new User({
        githubId: id,
        email,
        username: login,
      }).save();
      req.user = newUser;
      next();
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// local login
const login = (req, res, next) => {
  console.log("login handler called");
  console.log("login user ", req.user);
  const user = req.user;
  if (!user) return res.status(400).send({ message: "User does not exist." });
  next();
};

const register = async (req, res, next) => {
  console.log("register handler called");
  try {
    const { email, username, password } = req.body;
    if (!email || !password)
      return res
        .status(422)
        .send({ message: "Please provide email and password" });
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(422).send({ message: "Email is already in use." });

    const newUser = new User({
      email,
      username,
      password,
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw new Error("Something went wrong to save the user.");

    // const token = jwt.sign({ id: savedUser.id }, process.env.SECRET);

    return res.status(200).json({
      // token,
      user: {
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username,
      },
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

const test = (req, res) => {
  res.json({
    test: "auth route test",
  });
};

export default {
  currentUser,
  logout,
  register,
  login,
  github,
  githubCallback,
  test,
};
