const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// REGISTER

router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // Check existing user

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User Registered Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Registration Error",
      error: error.message,
    });

  }
});


// LOGIN

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // Find user

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    // Compare password

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // Generate JWT Token

    const token = jwt.sign(
      {
        id: user._id,
      },
      "mysecretkey",
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: "Login Error",
      error: error.message,
    });

  }
});

module.exports = router;