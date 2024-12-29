const Project = require('../models/Project');
const path = require('path');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { title, date, description, tags, category, github, webapp } = req.body;

    // Normalize the image path if an image is uploaded
    const image = req.file ? req.file.path.replace(/\\/g, '/') : null;

    const project = await Project.create({
      title,
      date,
      description,
      tags: tags ? JSON.parse(tags) : null, // Parse tags if provided
      category,
      github,
      webapp,
      image,
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { title, date, description, tags, category, github, webapp } = req.body;

    // Normalize the image path if an image is uploaded
    const image = req.file ? req.file.path.replace(/\\/g, '/') : null;

    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    await project.update({
      title,
      date,
      description,
      tags: tags ? JSON.parse(tags) : project.tags, // Retain old tags if not provided
      category,
      github,
      webapp,
      image: image || project.image, // Retain old image if no new image is uploaded
    });

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    await project.destroy();

    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
