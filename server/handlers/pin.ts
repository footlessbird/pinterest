import { createPrinter } from "typescript";
import Pin from "../models/pin";
import { PinModel } from "../models/pin";

const createPin = async (req, res, next) => {
  const { imgLink, imgDescription } = req.body;

  try {
    const user = req.user;
    const newPin: PinModel = await Pin.create({
      user,
      imgLink,
      imgDescription,
    });
    user.pins.push(newPin.id); // this logic will be removed in future
    await user.save();
    return res.status(201).json(newPin);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

const getPins = async (req, res, next) => {
  // console.log("getPins called");
  // console.log("getPins req.query.lasOneId", typeof req.query.lastOneId);

  let lastOneId;
  if (req.query.lastOneId === "") {
    lastOneId = null;
  } else {
    lastOneId = req.query.lastOneId;
  }

  // console.log("lastOneId", lastOneId);

  try {
    // const pins = await Pin.find().populate("user", ["id", "username"]);
    if (lastOneId === null || lastOneId === undefined || lastOneId === "") {
      const firstPins = await Pin.find({})
        .sort({ _id: -1 })
        .limit(10)
        .populate("user", ["id", "username"]);

      // console.log("first pins sending", firstPins);
      return res.status(200).json(firstPins);
    } else {
      const pins = await Pin.find({ _id: { $lt: lastOneId } })
        .sort({ _id: -1 })
        .limit(10)
        .populate("user", ["id", "username"]);

      // console.log("after first pins", pins);
      return res.status(200).json(pins);
    }
    // await Pin.find({ _id: { $lt: lastOneId } })
    //   .sort({ _id: -1 })
    //   .limit(5)
    //   .exec(function (err, docs) {
    //     if (err) {
    //       console.error(err);
    //     }
    //     lastOneId = docs.slice(-1)[0]._id;
    //     console.log("lastOne 2", lastOneId);
    //     return res.status(200).json(docs);
    //   });
    // console.log("pins from getPins??", pins);
    // return res.status(200).json(pins);
  } catch (err) {
    console.error(err);
    return next({
      status: 400,
      message: err.message,
    });
  }
};

const save = async (req, res, next) => {
  const pinId = req.params.id.toString();
  const userId = req.user._id;
  try {
    const pin = await Pin.findById(pinId);
    if (pin.user.equals(req.user._id)) {
      return res.status(400).json({ message: `Cannot pin your own.` });
    }
    if (!pin.savedBy[req.user._id]) {
      pin.savedBy[req.user._id] = true;
      pin.markModified("savedBy");
      await pin.save();
      return res.status(200).json(pin);

      // return res
      //   .status(200)
      //   .json({
      //     message: "You have successfully saved the pin.",
      //     pinId,
      //     userId,
      //   });
    } else {
      res.status(400).json({ message: "Already pinned." });
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

const deletePin = async (req, res, next) => {
  // 핀의 유저 프로퍼티랑 현재 로그인된 유저랑 같은지 체크
  // 같다면 (내가 생성한 핀) findByIdndRemove로 핀 삭제
  // 같지 않다면 (남의 핀을 다른 유저로써 저장) delete pin.savedBy[req.user._id]로 유저프로퍼티 삭제
  const thisUser = req.user.id;

  // console.log("thisUser??", typeof thisUser);
  const pinId = req.params.id.toString();
  try {
    const pin = await Pin.findById(pinId);
    if (!pin) throw new Error("No pin found.");
    if (pin.user.equals(req.user._id)) {
      await pin.remove();
      return res
        .status(200)
        .json({ message: "Pin has been successfully deleted.", pinId });
    } else {
      const savedBy = Object.keys(pin.savedBy);
      // console.log("savedBy??", savedBy);
      const savedByThisUser = savedBy && savedBy.includes(thisUser);
      // console.log("savedByThisUser??", savedByThisUser);
      if (savedByThisUser) {
        delete pin.savedBy[thisUser];
        pin.markModified("savedBy");
        await pin.save();
        return res.status(200).json({
          message: "Your saved pin successfully deleted.",
          pinId,
        });
      } else {
        throw new Error("Not authorized.");
      }
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

const usersPins = async (req, res, next) => {
  const userId = req.user._id;
  const condition = "savedBy." + userId;
  try {
    // db.inventory.find({ $or: [{ quantity: { $lt: 20 } }, { price: 10 }] });

    const pins = await Pin.find({
      $or: [{ [condition]: { $exists: true } }, { user: userId }],
    }).populate("user", ["id", "username"]);
    return res.status(200).json(pins);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

export default { createPin, getPins, save, usersPins, deletePin };
