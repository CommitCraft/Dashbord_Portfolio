const express = require('express');
const projectController = require('../controllers/projectController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/', upload.single('image'), projectController.createProject);
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', upload.single('image'), projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
