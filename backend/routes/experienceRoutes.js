const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experienceController");

// Multer Configuration for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", getAllExperiences);
router.get("/:id", getExperienceById);
router.post("/", upload.single("img"), createExperience); // Image upload in POST
router.put("/:id", upload.single("img"), updateExperience); // Optional image upload in PUT
router.delete("/:id", deleteExperience);

module.exports = router;
