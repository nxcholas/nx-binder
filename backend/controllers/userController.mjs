import User from '../models/userModel.mjs'
import jwt from 'jsonwebtoken'

// register user
async function registerUser (req, res) {
  const {name, email, password} = req.body;

  // check for all fields passed in req.body
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('please add all fields');
  }

  // check for user in db
  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // create the new user
  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      binder: null,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new Error('invalid user data');
  }
}

// login user


// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export {registerUser};