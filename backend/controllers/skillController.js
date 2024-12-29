const Skill = require('../models/Skill');

// Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
};

// Create a new skill
exports.createSkill = async (req, res) => {
  try {
    const { title, name } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !name) {
      return res.status(400).json({ error: 'Title and Name are required.' });
    }

    const skill = await Skill.create({ title, name, image });
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create skill' });
  }
};

// Update a skill
exports.updateSkill = async (req, res) => {
  try {
    const { title, name } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const skill = await Skill.findByPk(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    await skill.update({ title, name, image: image || skill.image });
    res.status(200).json(skill);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update skill' });
  }
};

// Delete a skill
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    await skill.destroy();
    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete skill' });
  }
};
