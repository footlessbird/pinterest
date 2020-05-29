import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/user";

const currentUser = (req, res, next) => {
  console.log("current_user ", req.user);
  // res.send(req.user);
  res.json(req.user);
};

const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

// local login
const login = (req, res, next) => {
  console.log("login handler called");
  console.log("login user ", req.user);
  const user = req.user;
  if (!user) throw new Error("User does not exist");
  // const secretOrKey = process.env.SECRET;
  const token = jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: 3600,
  });
  if (!token) throw new Error("JWT sign error");
  res.status(200).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  });
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

export default { currentUser, logout, register, login, test };
