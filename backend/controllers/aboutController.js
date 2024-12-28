// controllers/aboutController.js
const About = require('../models/About');

// Get all profiles
exports.getAllBios = async (req, res) => {
  try {
    const bios = await About.findAll();
    res.status(200).json(bios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve profiles' });
  }
};

// Get a profile by ID
exports.getBioById = async (req, res) => {
  const { id } = req.params;
  try {
    const bio = await About.findByPk(id);
    if (!bio) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(200).json(bio);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the profile' });
  }
};

// Create a new profile
exports.createBio = async (req, res) => {
  const { name, roles, description, github, resume, linkedin, twitter, insta, facebook } = req.body;
  const profilePic = req.file ? `/uploads/${req.file.filename}` : null; // Save file path

  try {
    const newBio = await About.create({ name, roles, description, github, resume, linkedin, twitter, insta, facebook, image: profilePic });
    res.status(201).json(newBio);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the profile' });
  }
};

// Update a profile by ID
exports.updateBio = async (req, res) => {
  const { id } = req.params;
  const { name, roles, description, github, resume, linkedin, twitter, insta, facebook } = req.body;
  const profilePic = req.file ? `/uploads/${req.file.filename}` : null; // Save file path

  try {
    const bio = await About.findByPk(id);
    if (!bio) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    await bio.update({ name, roles, description, github, resume, linkedin, twitter, insta, facebook, image: profilePic || bio.image });
    res.status(200).json(bio);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the profile' });
  }
};

// Delete a profile by ID
exports.deleteBio = async (req, res) => {
  const { id } = req.params;
  try {
    const bio = await About.findByPk(id);
    if (!bio) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    await bio.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the profile' });
  }
};
