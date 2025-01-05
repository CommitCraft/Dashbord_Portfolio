const { request } = require('http');
const About = require('../models/About');
const path = require('path');

// Get all about entries
exports.getAllAbout = async (req, res) => {
  try {
    const abouts = await About.findAll();
    res.status(200).json(abouts);
    console.log("Get Data ABout", abouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch about entries.' });
  }
};

// Get an about entry by ID
exports.getAboutById = async (req, res) => {
  try {
    const about = await About.findByPk(req.params.id);
    if (!about) return res.status(404).json({ error: 'About entry not found.' });
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch about entry.' });
  }
};

// Create a new about entry with image upload
exports.createAbout = async (req, res) => {
  try {
    const { name, roles, description, github, linkedin, twitter, insta, facebook } = req.body;

    // Get the uploaded image file path
    const image = req.file ? req.file.path : null;
    

    const newAbout = await About.create({
      name,
      roles: JSON.parse(roles),
      description,
      github,
      linkedin,
      twitter,
      insta,
      facebook,
      image,
    });

    res.status(201).json(newAbout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create about entry.' });
  }
};

// Update an about entry with image upload
exports.updateAbout = async (req, res) => {
  try {
    const about = await About.findByPk(req.params.id);
    if (!about) return res.status(404).json({ error: 'About entry not found.' });

    const { name, roles, description, github, linkedin, twitter, insta, facebook } = req.body;

    // Get the uploaded image file path (if provided)
    const image = req.file ? req.file.path : about.image;

    const updatedAbout = await about.update({
      name,
      roles: JSON.parse(roles),
      description,
      github,
      linkedin,
      twitter,
      insta,
      facebook,
      image,
    });

    res.status(200).json(updatedAbout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update about entry.' });
  }
};

// Delete an about entry
exports.deleteAbout = async (req, res) => {
  try {
    const about = await About.findByPk(req.params.id);
    if (!about) return res.status(404).json({ error: 'About entry not found.' });

    await about.destroy();
    res.status(200).json({ message: 'About entry deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete about entry.' });
  }
};
