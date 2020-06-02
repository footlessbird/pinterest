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

const save = async (req, res, next) => {
  const pinId = req.params.id.toString();
  try {
    const pin = await Pin.findById(pinId);
    console.log(`${pin.user._id} owns this pin `);
    console.log("req.user.id", req.user.id);
    console.log("same user? ", pin.user._id === req.user.id);
    console.log("pin created by type", typeof pin.user._id);
    console.log("req.user.id type", typeof req.user.id);
    console.log(
      "if toString then same user? ",
      pin.user._id.toString() === req.user.id
    );
    if (pin.user._id.toString() === req.user.id) {
      throw new Error("Cannot pin my own");
    } else if (pin.savedBy.includes(req.user.id)) {
      throw new Error("Already saved");
    } else {
      pin.savedBy.push(req.user.id);
      await pin.save();
      return res.status(200).json(pin);
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

const usersPins = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const myPins = await Pin.find({ user: req.user.id });
    const pins = await Pin.find();
    const savedPins = pins.filter((pin) => pin.savedBy.includes(userId));
    const result = [...myPins, ...savedPins];

    const returnUsersPins = () => {
      return result.map((pin) => {
        const { user, imgLink, imgDescription, savedBy } = pin;
        return {
          user,
          imgLink,
          imgDescription,
          savedBy,
        };
      });
    };
    console.log("returnUsersPins", returnUsersPins);
    return res.status(200).json(returnUsersPins());
  } catch (err) {
    throw new Error(err);
  }
};

export default { createPin, getPins, save, usersPins };
