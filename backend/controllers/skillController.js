const Skill = require('../models/Skill');
const Category = require('../models/SkillCategory');

// Create a new skill
exports.createSkill = async (req, res) => {
  try {
    const { title, categoryId } = req.body;
    const image = req.file ? req.file.path : null;

    const skill = await Skill.create({ title, categoryId, image });
    res.status(201).json({ message: 'Skill created successfully', skill });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll({ include: Category });
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a skill by ID
exports.getSkillById = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByPk(id, { include: Category });

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.status(200).json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a skill
exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, categoryId } = req.body;
    const image = req.file ? req.file.path : null;

    const skill = await Skill.findByPk(id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    skill.title = title || skill.title;
    skill.categoryId = categoryId || skill.categoryId;
    if (image) skill.image = image;

    await skill.save();
    res.status(200).json({ message: 'Skill updated successfully', skill });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a skill
exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByPk(id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    await skill.destroy();
    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
