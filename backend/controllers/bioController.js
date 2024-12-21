const Bio = require('../models/Bio');

// Get Bio details
const getBio = async (req, res) => {
  try {
    const bio = await Bio.findOne();
    if (!bio) {
      return res.status(404).json({ message: 'Bio not found' });
    }
    res.status(200).json(bio);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bio' });
  }
};

// Create or Update Bio details
const createOrUpdateBio = async (req, res) => {
  try {
    const { name, roles, description, github, resume, linkedin, twitter, insta, facebook } = req.body;

    const bioData = {
      name,
      roles,
      description,
      github,
      resume,
      linkedin,
      twitter,
      insta,
      facebook
    };

    // Check if bio already exists
    const existingBio = await Bio.findOne();
    if (existingBio) {
      // If bio exists, update it
      await Bio.update(bioData, { where: { id: existingBio.id } });
      return res.status(200).json({ message: 'Bio updated successfully' });
    }

    // If no bio exists, create a new one
    const newBio = await Bio.create(bioData);
    res.status(201).json(newBio);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create or update bio' });
  }
};

module.exports = { getBio, createOrUpdateBio };
