// controllers/projectCategoryController.js
const ProjectCategory = require('../models/ProjectCategory');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectCategory.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const newProject = await ProjectCategory.create({ name });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
