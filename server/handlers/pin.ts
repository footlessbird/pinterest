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
  console.log("getPins called");
  try {
    const pins = await Pin.find().populate("user", ["id", "username"]);
    console.log("pins from getPins??", pins);
    return res.status(200).json(pins);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

const save = async (req, res, next) => {
  const pinId = req.params.id.toString();
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

export default { createPin, getPins, save, usersPins };
