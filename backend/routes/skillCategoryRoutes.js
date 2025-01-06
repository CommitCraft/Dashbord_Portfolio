// routes/skillCategoryRoutes.js
const express = require('express');
const router = express.Router();
const skillCategoryController = require('../controllers/skillCategoryController');

router.get('/', skillCategoryController.getAllSkills);
router.post('/', skillCategoryController.createSkill);

module.exports = router;
