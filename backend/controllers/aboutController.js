const About = require('../models/About');

// Get all bios
exports.getAllBios = async (req, res) => {
  try {
    const bios = await About.findAll();
    res.status(200).json(bios);
  } catch (error) {
    console.error('Error fetching bios:', error);
    res.status(500).json({ error: 'Failed to fetch bios' });
  }
};

// Get bio by ID
exports.getBioById = async (req, res) => {
  try {
    const bio = await About.findByPk(req.params.id);
    if (!bio) {
      return res.status(404).json({ error: 'Bio not found' });
    }
    res.status(200).json(bio);
  } catch (error) {
    console.error('Error fetching bio:', error);
    res.status(500).json({ error: 'Failed to fetch bio' });
  }
};

// Create bio
exports.createBio = async (req, res) => {
  try {
    const { name, roles, description, github, linkedin, twitter, insta, facebook } = req.body;
    const resume = req.files.resume ? `/uploads/${req.files.resume[0].filename}` : null;
    const image = req.files.image ? `/uploads/${req.files.image[0].filename}` : null;

    if (!name || !roles || !description || !github || !linkedin) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const rolesArray = JSON.parse(roles); // Convert roles JSON string to array

    const newBio = await About.create({
      name,
      roles: rolesArray,
      description,
      github,
      linkedin,
      twitter,
      insta,
      facebook,
      resume,
      image,
    });

    res.status(201).json(newBio);
  } catch (error) {
    console.error('Error creating bio:', error);
    res.status(500).json({ error: 'Failed to create bio' });
  }
};

// Update bio
exports.updateBio = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, roles, description, github, linkedin, twitter, insta, facebook } = req.body;
    const resume = req.files.resume ? `/uploads/${req.files.resume[0].filename}` : null;
    const image = req.files.image ? `/uploads/${req.files.image[0].filename}` : null;

    const bio = await About.findByPk(id);
    if (!bio) {
      return res.status(404).json({ error: 'Bio not found' });
    }

    const rolesArray = roles ? JSON.parse(roles) : bio.roles;

    await bio.update({
      name,
      roles: rolesArray,
      description,
      github,
      linkedin,
      twitter,
      insta,
      facebook,
      resume: resume || bio.resume,
      image: image || bio.image,
    });

    res.status(200).json(bio);
  } catch (error) {
    console.error('Error updating bio:', error);
    res.status(500).json({ error: 'Failed to update bio' });
  }
};

// Delete bio
exports.deleteBio = async (req, res) => {
  try {
    const { id } = req.params;

    const bio = await About.findByPk(id);
    if (!bio) {
      return res.status(404).json({ error: 'Bio not found' });
    }

    await bio.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting bio:', error);
    res.status(500).json({ error: 'Failed to delete bio' });
  }
};
