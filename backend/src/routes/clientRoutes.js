const express = require("express");
const multer = require("multer");
const Client = require("../models/Client");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Get all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Create a new client
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, designation, description } = req.body;

    // Validation
    if (!name || !designation || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const client = new Client({
      name,
      designation,
      description,
      image: req.file ? "/uploads/" + req.file.filename : null,
    });

    await client.save();
    res.status(201).json({
      message: "Client added successfully",
      ...client.toObject(),
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding client" });
  }
});

// Delete a client
router.delete("/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting client" });
  }
});

module.exports = router;
