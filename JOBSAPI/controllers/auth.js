const User = require("../models/User.js");
require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const register = async (req, res) => {
  // CHECKING VALIDATION IN THE CONTROLLER Directly
  // const { name, email, password } = req.body;
  // if (!name || !email || !password) {
  //   throw new BadRequestError("please provide name, email and password");
  // }
  // VALIDATING IN MONGOOSE

  // const { name, email, password } = req.body;
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  // const tempUser = { name: name, email: email, password: hashedPassword };

  // const user = await User.create({ ...tempUser });
  // hashed password before saving to mongodb in mongoo middleware
  const user = await User.create({ ...req.body });
  // create token
  // const token = jwt.sign(
  //   { userId: user._id, name: user.name },
  //   process.env.JWT_SECRET,
  //   { expiresIn: "30d" }
  // );
  //
  //
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  // user exists check for password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token: token });
};

module.exports = { register, login };
