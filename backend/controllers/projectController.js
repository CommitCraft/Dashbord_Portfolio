const Project = require('../models/Project');

// Create a new project with image uploads
exports.createProject = async (req, res) => {
  try {
    const { title, description, tags, category, github, webapp } = req.body;

    const iconImage = req.files.iconImage ? req.files.iconImage[0].path : null;
    const images = req.files.images ? req.files.images.map((file) => file.path) : [];

    const project = await Project.create({
      title,
      description,
      images,
      iconImage,
      tags: tags ? JSON.parse(tags) : null, // Parse JSON string if necessary
      category,
      github,
      webapp,
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
    const { id } = req.params;
    const project = await Project.findByPk(id);
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
    const { id } = req.params;
    const { title, description, tags, category, github, webapp } = req.body;

    const iconImage = req.files.iconImage ? req.files.iconImage[0].path : null;
    const images = req.files.images ? req.files.images.map((file) => file.path) : [];

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    await project.update({
      title,
      description,
      images: images.length ? images : project.images,
      iconImage: iconImage || project.iconImage,
      tags: tags ? JSON.parse(tags) : project.tags,
      category,
      github,
      webapp,
    });

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    await project.destroy();
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
