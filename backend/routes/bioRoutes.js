// backend/routes/bioRoutes.js
const express = require('express');
const router = express.Router();
const Bio = require('../models/Bio');
const multer = require('multer');
const path = require('path');

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Get all bio data
router.get('/', async (req, res) => {
  try {
    const bios = await Bio.findAll();
    res.json(bios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new bio data with file upload
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const { name, roles, description, github, linkedin, twitter, insta, facebook } = req.body;
    const bio = await Bio.create({
      name,
      roles: JSON.parse(roles), // Ensure roles is parsed as an array
      description,
      github,
      resume: req.file.path, // Save file path for resume
      linkedin,
      twitter,
      insta,
      facebook,
    });
    res.status(201).json(bio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update existing bio
router.put('/:id', upload.single('resume'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, roles, description, github, linkedin, twitter, insta, facebook } = req.body;

    const bio = await Bio.findByPk(id);
    if (!bio) {
      return res.status(404).json({ message: 'Bio not found' });
    }

    bio.name = name;
    bio.roles = JSON.parse(roles);
    bio.description = description;
    bio.github = github;
    bio.resume = req.file ? req.file.path : bio.resume;
    bio.linkedin = linkedin;
    bio.twitter = twitter;
    bio.insta = insta;
    bio.facebook = facebook;

    await bio.save();
    res.json(bio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete bio
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bio = await Bio.findByPk(id);
    if (!bio) {
      return res.status(404).json({ message: 'Bio not found' });
    }

    await bio.destroy();
    res.json({ message: 'Bio deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
