const express = require('express');
const router = express.Router();
const multer = require('multer');
const educationController = require('../controllers/educationController');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Routes
router.get('/', educationController.getAllEducation);
router.get('/:id', educationController.getEducationById);
router.post('/', upload.single('img'), educationController.createEducation);
router.put('/:id', upload.single('img'), educationController.updateEducation);
router.delete('/:id', educationController.deleteEducation);

module.exports = router;
