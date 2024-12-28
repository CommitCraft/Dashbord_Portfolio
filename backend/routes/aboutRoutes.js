// routes/about.js
const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const upload = require('../middlewares/upload');

// Routes
router.get('/', aboutController.getAllBios);
router.get('/:id', aboutController.getBioById);
router.post('/', upload.single('profile_pic'), aboutController.createBio); // Accept image file
router.put('/:id', upload.single('profile_pic'), aboutController.updateBio); // Accept image file
router.delete('/:id', aboutController.deleteBio);

module.exports = router;