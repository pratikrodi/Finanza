const express = require("express");
const router = express.Router();
const User = require("../models/client");

router.post("/signup", async (req, res) => {
  try {
    const { name, age, email, mobile, address, password } = req.body; // Added password
    const newUser = new User({ name, age, email, mobile, address, password }); // Added password
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
