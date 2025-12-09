const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// Get all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Create a new contact
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, city } = req.body;

    // Validation
    if (!name || !email || !phone || !city) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      city,
    });

    await contact.save();
    res.status(201).json({
      message: "Contact submitted successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ error: "Error submitting contact" });
  }
});

// Delete a contact
router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting contact" });
  }
});

module.exports = router;
