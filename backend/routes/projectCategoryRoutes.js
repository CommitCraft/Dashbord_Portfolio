// routes/projectCategoryRoutes.js
const express = require('express');
const router = express.Router();
const projectCategoryController = require('../controllers/projectCategoryController');

router.get('/', projectCategoryController.getAllProjects);
router.post('/', projectCategoryController.createProject);

module.exports = router;
