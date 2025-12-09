const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();

// Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });

    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// Create Admin (One time use)
router.post("/create-admin", async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    const admin = new Admin({
      email: req.body.email,
      password: hashedPass,
    });

    await admin.save();
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: "Error creating admin" });
  }
});

module.exports = router;
