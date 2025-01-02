const express = require('express');
const multer = require('multer');
const path = require('path');
const aboutController = require('../controllers/aboutController');

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

const router = express.Router();

router.get('/', aboutController.getAllAbout);
router.get('/:id', aboutController.getAboutById);
router.post('/', upload.single('image'), aboutController.createAbout);
router.put('/:id', upload.single('image'), aboutController.updateAbout);
router.delete('/:id', aboutController.deleteAbout);

module.exports = router;
