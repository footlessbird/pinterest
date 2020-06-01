import Pin from "../models/pin";

const createPin = async (req, res, next) => {
  const { imgLink, imgDescription } = req.body;
  try {
    const user = req.user;
    const newPin = await Pin.create({
      user,
      imgLink,
      imgDescription,
      savedBy: [],
    });
    user.pins.push(newPin.id);
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
  try {
    const pins = await Pin.find();
    return res.status(200).json(pins);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

export default { createPin, getPins };
