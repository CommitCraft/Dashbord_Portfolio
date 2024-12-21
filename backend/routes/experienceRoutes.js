const express = require("express");
const Experience = require("../models/experience");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new experience
router.post("/", protect, async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: "Error creating experience.", error });
  }
});

// Get all experiences
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.findAll();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Error fetching experiences.", error });
  }
});

// Update an experience
router.put("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findByPk(id);
    if (!experience) return res.status(404).json({ message: "Experience not found." });

    const updated = await experience.update(req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating experience.", error });
  }
});

// Delete an experience
router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findByPk(id);
    if (!experience) return res.status(404).json({ message: "Experience not found." });

    await experience.destroy();
    res.json({ message: "Experience deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting experience.", error });
  }
});

module.exports = router;
