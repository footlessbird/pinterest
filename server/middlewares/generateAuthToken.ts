import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import passport from "passport";

function getJwt(userId) {
  const token = jwt.sign({ id: userId }, process.env.SECRET, {
    expiresIn: 3600,
  });
  if (!token) throw new Error("JWT sign error");
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

export default function setUserWithToken(req, res, next) {
  // console.log("setUserWithToken req.user", req.user);
  passport.authenticate("local", function (err, user, info) {
    if (req.user) {
      const token = getJwt(req.user.id);
      const { id, email, username } = req.user;
      return res.status(200).json({
        token,
        user: {
          id,
          email,
          username,
        },
      });
    } else {
      // console.log("setUserWithToken user", user);
      // console.log("setUserWithToken info", info);
      const token = getJwt(user.id);
      const { id, email, username } = user;
      // console.log(id, email, username);
      if (info) {
        return res.status(400).send({ message: info.message });
      } else {
        return res.status(200).json({
          token,
          user: {
            id,
            email,
            username,
          },
        });
      }
    }
  })(req, res, next);
}
