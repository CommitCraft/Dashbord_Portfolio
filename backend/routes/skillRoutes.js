const express = require('express');
const skillController = require('../controllers/skillController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/', upload.single('image'), skillController.createSkill);
router.get('/', skillController.getSkills);
router.get('/:id', skillController.getSkillById);
router.put('/:id', upload.single('image'), skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);

module.exports = router;
