const express = require("express");
const Newsletter = require("../models/Newsletter");

const router = express.Router();

// Get all newsletter subscriptions
router.get("/", async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    res.json(newsletters);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Subscribe to newsletter
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Check if email already exists
    const existingEmail = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already subscribed" });
    }

    const newsletter = new Newsletter({
      email: email.toLowerCase(),
    });

    await newsletter.save();
    res.status(201).json({
      message: "Successfully subscribed to newsletter",
      email: newsletter.email,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already subscribed" });
    }
    res.status(500).json({ error: "Error subscribing to newsletter" });
  }
});

// Delete newsletter subscription
router.delete("/:id", async (req, res) => {
  try {
    const newsletter = await Newsletter.findByIdAndDelete(req.params.id);
    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter subscription not found" });
    }
    res.json({ message: "Subscription removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error removing subscription" });
  }
});

module.exports = router;
