const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const skillController = require('../controllers/skillController');

const router = express.Router();

router.get('/', skillController.getSkills);
router.post('/', upload.single('image'), skillController.addSkill);
router.delete('/:id', skillController.deleteSkill);

module.exports = router;
