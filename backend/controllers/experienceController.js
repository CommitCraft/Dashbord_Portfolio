const Experience = require("../models/Experience");
const path = require("path");
const fs = require("fs");

// Get all experiences
exports.getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.findAll();
    res.status(200).json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
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
    console.error("Error fetching experience:", error);
    res.status(500).json({ error: "Failed to fetch experience." });
  }
};

// Create a new experience with image upload
exports.createExperience = async (req, res) => {
  try {
    const { role, company, date, desc, skills, doc } = req.body;
    const img = req.file ? `/uploads/${req.file.filename}` : '/uploads/default-placeholder.png'; // Use default image if none uploaded

    if (!role || !company || !date || !desc || !skills) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Handle skills input
    const parsedSkills = Array.isArray(skills)
      ? skills
      : (skills && typeof skills === "string")
      ? skills.split(",").map((skill) => skill.trim())
      : [];

    const newExperience = await Experience.create({
      img,
      role,
      company,
      date,
      desc,
      skills: parsedSkills,
      doc,
    });

    res.status(201).json(newExperience);
  } catch (error) {
    console.error("Error creating experience:", error);
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

    if (req.file && experience.img && experience.img !== '/uploads/default-placeholder.png') {
      // Delete old image if a new one is uploaded and it's not the default placeholder
      const oldImagePath = path.join(__dirname, "..", experience.img);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Handle skills input
    const parsedSkills = Array.isArray(skills)
      ? skills
      : (skills && typeof skills === "string")
      ? skills.split(",").map((skill) => skill.trim())
      : [];

    await experience.update({
      img,
      role,
      company,
      date,
      desc,
      skills: parsedSkills,
      doc,
    });

    res.status(200).json(experience);
  } catch (error) {
    console.error("Error updating experience:", error);
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

    if (experience.img && experience.img !== '/uploads/default-placeholder.png') {
      // Delete associated image file
      const imagePath = path.join(__dirname, "..", experience.img);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await experience.destroy();
    res.status(200).json({ message: "Experience deleted successfully." });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ error: "Failed to delete experience." });
  }
};
