const express = require("express");
const  Education  = require("../models/Education");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

// Get all education records
router.get("/", async (req, res) => {
  try {
    const records = await Education.findAll();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new education record
router.post("/", verifyToken, async (req, res) => {
  try {
    const record = await Education.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an education record
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Education.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Record updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an education record
router.delete("/:id",  async (req, res) => {
  try {
    const deleted = await Education.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
