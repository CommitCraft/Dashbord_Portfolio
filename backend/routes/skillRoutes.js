const express = require('express');
const multer = require('multer');
const skillController = require('../controllers/skillController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', skillController.getAllSkills);
router.post('/', upload.single('image'), skillController.createSkill);
router.put('/:id', upload.single('image'), skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);

module.exports = router;
