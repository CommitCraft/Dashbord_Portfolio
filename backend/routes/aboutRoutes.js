const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const upload = require('../middlewares/upload');

// Routes
router.get('/', aboutController.getAllBios);
router.get('/:id', aboutController.getBioById);

// Accept `resume` and `image` files
router.post('/', upload.fields([{ name: 'resume' }, { name: 'image' }]), aboutController.createBio);
router.put('/:id', upload.fields([{ name: 'resume' }, { name: 'image' }]), aboutController.updateBio);

router.delete('/:id', aboutController.deleteBio);

module.exports = router;
