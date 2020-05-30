import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

function getJwt(userId) {
  const token = jwt.sign({ id: userId }, process.env.SECRET, {
    expiresIn: 3600,
  });
  return token;
}

export default function setUserWithToken(req, res) {
  const token = getJwt(req.user.id);
  const { id, email, username } = req.user;
  res.status(200).json({
    token,
    user: {
      id,
      email,
      username,
    },
  });
}
