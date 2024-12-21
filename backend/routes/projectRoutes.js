const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middlewares/authMiddleware');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new project (JWT Protected)
router.post('/', auth, async (req, res) => {
  const { title, date, description, image, tags, category, github, webapp } = req.body;
  try {
    const newProject = await Project.create({ title, date, description, image, tags, category, github, webapp });
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a project by ID (JWT Protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Project.update(req.body, { where: { id } });
    if (updated) res.json({ message: 'Project updated' });
    else res.status(404).json({ message: 'Project not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a project by ID (JWT Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.destroy({ where: { id } });
    if (deleted) res.json({ message: 'Project deleted' });
    else res.status(404).json({ message: 'Project not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
