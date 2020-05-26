import jwt from "jsonwebtoken";
import User from "../models/user";

const currentUser = (req, res, next) => {
  res.send(req.user);
};

const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const { id, email, username } = user;

    const token = jwt.sign({ id, username }, process.env.SECRET);

    return res.status(201).json({
      id,
      email,
      username,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username is already taken";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};

export default { currentUser, logout, register };
