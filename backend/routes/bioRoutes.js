const express = require("express");
const { getBio, createBio, deleteBio } = require("../controllers/bioController");

const router = express.Router();

router.get("/", getBio); // Fetch bio details
router.post("/", createBio); // Create a new bio
router.delete("/:id", deleteBio); // Delete a bio by ID

module.exports = router;
