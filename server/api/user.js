const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const createUser = asyncHandler(async (req, res) => {
  let { name, email, number, password, DOB } = req.body;

  if (!name || !email || !number || !password || !DOB) {
    return res.status(400).json({
      status: "Fail",
      message: "Input fields are mandatory",
    });
  }

  if (!/^[a-zA-Z ]*$/.test(name)) {
    return res.status(400).json({
      status: "Fail",
      message: "Invalid name entered",
    });
  }

  if (!/^[\w\.-]+@[\w-]+\.[\w]{2,4}$/.test(email)) {
    return res.status(400).json({
      status: "Fail",
      message: "Invalid Email entered",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      status: "Fail",
      message: "Password is too short",
    });
  }

  if (!new Date(DOB).getTime()) {
    return res.status(400).json({
      status: "Fail",
      message: "Invalid Date of birth",
    });
  }

  if (!/^\d{10}$/.test(number)) {
    return res.status(400).json({
      status: "Fail",
      message: "Invalid mobile number",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser !== null) {
    return res.status(400).json({
      status: "Fail",
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User({
    name,
    email,
    number,
    password: hashedPassword,
    DOB,
  });

  const savedUser = await user.save();

  return res.status(200).json({
    status: "Success",
    message: savedUser,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "Fail",
      message: "Input fields are mandatory",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      status: "Fail",
      message: "Invalid Email or Password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      status: "Fail",
      message: "Invalid password",
    });
  } else {
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      status: "Success",
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        number: user.number,
        DOB: user.DOB,
      },
      token: accessToken,
      expiresin: "1h",
    });
  }
});

const currentUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id });

  if (!user) {
    return res.status(404).json({
      status: "Fail",
      message: "User not found",
    });
  }

  return res.status(200).json({
    status: "Success",
    message: user,
  });
});

module.exports = { createUser, loginUser, currentUser };
