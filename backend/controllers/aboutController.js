const Bio = require('../models/About');

// Get all profiles
exports.getAllBios = async (req, res) => {
  try {
    const bios = await Bio.findAll();
    res.status(200).json(bios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single profile
exports.getBioById = async (req, res) => {
  try {
    const bio = await Bio.findByPk(req.params.id);
    if (bio) {
      res.status(200).json(bio);
    } else {
      res.status(404).json({ message: 'Bio not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new profile
exports.createBio = async (req, res) => {
  try {
    const { name, roles, description, github, linkedin, twitter, insta, facebook } = req.body;
    const image = req.file ? req.file.path : null;

    const parsedRoles = typeof roles === 'string' ? JSON.parse(roles) : roles;

    const bio = await Bio.create({
      name,
      roles: parsedRoles,
      description,
      github,
      linkedin,
      twitter,
      insta,
      facebook,
      image,
    });
    res.status(201).json(bio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a profile
exports.updateBio = async (req, res) => {
  try {
    const bio = await Bio.findByPk(req.params.id);
    if (bio) {
      const updatedData = { ...req.body };
      if (req.file) updatedData.image = req.file.path;

      if (updatedData.roles && typeof updatedData.roles === 'string') {
        updatedData.roles = JSON.parse(updatedData.roles);
      }

      await bio.update(updatedData);
      res.status(200).json(bio);
    } else {
      res.status(404).json({ message: 'Bio not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a profile
exports.deleteBio = async (req, res) => {
  try {
    const bio = await Bio.findByPk(req.params.id);
    if (bio) {
      await bio.destroy();
      res.status(200).json({ message: 'Bio deleted successfully' });
    } else {
      res.status(404).json({ message: 'Bio not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
