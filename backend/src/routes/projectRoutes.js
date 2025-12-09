const express = require("express");
const router = express.Router();
const multer = require("multer");
const Project = require("../models/Project");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      image: req.file ? "/uploads/" + req.file.filename : null,
    });

    await project.save();
    return res.json(project);
  } catch (err) {
    return res.status(500).json("Error adding project");
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    return res.json(projects);
  } catch (err) {
    return res.status(500).json("Error fetching projects");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting project" });
  }
});

module.exports = router;
