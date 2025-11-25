import User from "../models/userModel.mjs";
import jwt from "jsonwebtoken";

// register user
async function registerUser(req, res) {
  const { name, email, password } = req.body;

  // check for all fields passed in req.body
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please add all fields");
  }

  // check for user in db
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // create the new user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
}

// login user
async function loginUser(req, res) {
  // destructure body params
  const { email, password } = req.body;

  // check if user email exists in User table
  const user = await User.findOne({ email });

  // check password
  if (user && password === user.password) {
    res.json({
      msg: "user logged in",
      _id: user.id,
      name: user.name,
      email: user.email,
      binder: user.binder,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ msg: "wrong email or password" });
  }
}

// add a card
// @private
// before this function can run, must be protected with jwt token sent in Header auth
// this function probably needs more params for specific card passed in
async function addCard(req, res) {
  try {
    // sample card data to add
    // raw example
    // const card = {
    //   id: "sv10.5b-170",
    //   image: "https://assets.tcgdex.net/en/sv/sv10.5b/170",
    //   localId: "170",
    //   name: "N's Plan",
    // };

    // card data to add
    // req.body
    const { id, image, localId, name } = req.body;
    const card = { id, image, localId, name };

    // add card to user.binder
    req.user.binder.push(card);

    // save added card to db
    const updatedUser = await req.user.save();

    // log
    res.status(200).json({
      msg: "card added successfully",
      user: updatedUser.name,
      binder: updatedUser.binder,
    });
  } catch (error) {
    console.log(error);
    throw new Error("error when adding new card");
  }
}

// delete card
// @private
async function deleteCard(req, res) {
  try {
    // destructure card from url params
    const { _id } = req.params;

    // delete card from req.user
    req.user.binder = req.user.binder.filter((card) => {
      card._id !== _id;
    });
    // save binder
    const updatedUser = await req.user.save();

    // log
    res.status(200).json({
      msg: "card deleted successfully",
      user: updatedUser.name,
      binder: updatedUser.binder,
    });
  } catch (error) {
    console.error(error);
    throw new Error ('Error when deleting card')
  }
}

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export { registerUser, loginUser, addCard, deleteCard };
