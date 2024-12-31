const express = require('express');
const projectController = require('../controllers/projectController');
const upload = require('../middlewares/upload');

const router = express.Router();

// Route to create a new project with file uploads
router.post(
  '/',
  upload.fields([
    { name: 'iconImage', maxCount: 1 }, // Single icon image
    { name: 'images', maxCount: 5 },   // Up to 5 images
  ]),
  projectController.createProject
);

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.put(
  '/:id',
  upload.fields([
    { name: 'iconImage', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]),
  projectController.updateProject
);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
