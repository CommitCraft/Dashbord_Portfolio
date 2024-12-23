const Bio = require("../models/Bio");

// Fetch bio details
const getBio = async (req, res) => {
  try {
    const bio = await Bio.findAll();
    res.status(200).json(bio);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bio", error });
  }
};

// Create a new bio
const createBio = async (req, res) => {
  try {
    const { name, roles, description, github, linkedin, twitter } = req.body;
    const image = req.file?.path; // Image path from Multer
    const newBio = await Bio.create({ name, roles, description, github, linkedin, twitter, image });
    res.status(201).json(newBio);
  } catch (error) {
    res.status(500).json({ message: "Error creating bio", error });
  }
};

// Delete a bio
const deleteBio = async (req, res) => {
  try {
    const { id } = req.params;
    const bio = await Bio.destroy({ where: { id } });
    if (bio) res.status(200).json({ message: "Bio deleted successfully" });
    else res.status(404).json({ message: "Bio not found" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bio", error });
  }
};

module.exports = { getBio, createBio, deleteBio };
