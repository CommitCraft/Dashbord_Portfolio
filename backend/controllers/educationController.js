const Education = require('../models/Education');

// Get all education records
exports.getAllEducation = async (req, res) => {
  try {
    const education = await Education.findAll();
    res.status(200).json(education);
  } catch (error) {
    console.error('Error fetching education data:', error);
    res.status(500).json({ error: 'Failed to fetch education records' });
  }
};

// Get a single education record by ID
exports.getEducationById = async (req, res) => {
  try {
    const education = await Education.findByPk(req.params.id);
    if (!education) {
      return res.status(404).json({ error: 'Education record not found' });
    }
    res.status(200).json(education);
  } catch (error) {
    console.error('Error fetching education record:', error);
    res.status(500).json({ error: 'Failed to fetch education record' });
  }
};

// Create a new education record
exports.createEducation = async (req, res) => {
  try {
    const { school, degree, date, grade, desc } = req.body;
    const img = req.file ? `/uploads/${req.file.filename}` : null;

    if (!school || !degree || !date || !desc) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const newEducation = await Education.create({ school, degree, date, grade, desc, img });
    res.status(201).json(newEducation);
  } catch (error) {
    console.error('Error creating education record:', error);
    res.status(500).json({ error: 'Failed to create education record' });
  }
};

// Update an education record
exports.updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { school, degree, date, grade, desc } = req.body;
    const img = req.file ? `/uploads/${req.file.filename}` : null;

    const education = await Education.findByPk(id);
    if (!education) {
      return res.status(404).json({ error: 'Education record not found' });
    }

    await education.update({ school, degree, date, grade, desc, img: img || education.img });
    res.status(200).json(education);
  } catch (error) {
    console.error('Error updating education record:', error);
    res.status(500).json({ error: 'Failed to update education record' });
  }
};

// Delete an education record
exports.deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const education = await Education.findByPk(id);
    if (!education) {
      return res.status(404).json({ error: 'Education record not found' });
    }

    await education.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting education record:', error);
    res.status(500).json({ error: 'Failed to delete education record' });
  }
};
