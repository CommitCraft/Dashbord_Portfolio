const Experience = require("../models/Experience");
const path = require("path");

// Get all experiences
exports.getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.findAll();
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch experiences." });
  }
};

// Get a single experience by ID
exports.getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findByPk(id);

    if (!experience) {
      return res.status(404).json({ error: "Experience not found." });
    }

    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch experience." });
  }
};

// Create a new experience with image upload
exports.createExperience = async (req, res) => {
  try {
    const { role, company, date, desc, skills, doc } = req.body;
    const img = req.file ? `/uploads/${req.file.filename}` : null; // Save the uploaded image path

    const newExperience = await Experience.create({
      img,
      role,
      company,
      date,
      desc,
      skills: JSON.parse(skills), // Parse JSON string to array
      doc,
    });

    res.status(201).json(newExperience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create experience." });
  }
};

// Update an experience by ID (with optional image upload)
exports.updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, company, date, desc, skills, doc } = req.body;

    const experience = await Experience.findByPk(id);
    if (!experience) {
      return res.status(404).json({ error: "Experience not found." });
    }

    const img = req.file ? `/uploads/${req.file.filename}` : experience.img;

    await experience.update({
      img,
      role,
      company,
      date,
      desc,
      skills: JSON.parse(skills),
      doc,
    });

    res.status(200).json(experience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update experience." });
  }
};

// Delete an experience by ID
exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findByPk(id);
    if (!experience) {
      return res.status(404).json({ error: "Experience not found." });
    }

    await experience.destroy();
    res.status(200).json({ message: "Experience deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete experience." });
  }
};
