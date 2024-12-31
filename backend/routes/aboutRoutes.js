const express = require('express');
const bioController = require('../controllers/aboutController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/', bioController.getAllBios);
router.get('/:id', bioController.getBioById);
router.post('/', upload.single('image'), bioController.createBio);
router.put('/:id', upload.single('image'), bioController.updateBio);
router.delete('/:id', bioController.deleteBio);

module.exports = router;
