// controllers/skillCategoryController.js
const SkillCategory = require('../models/SkillCategory');

exports.getAllSkills = async (req, res) => {
  try {
    const skills = await SkillCategory.findAll();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSkill = async (req, res) => {
  try {
    const { name } = req.body;
    const newSkill = await SkillCategory.create({ name });
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
