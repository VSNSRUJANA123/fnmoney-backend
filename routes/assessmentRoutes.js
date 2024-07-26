// backend/routes/assessmentRoutes.js
const express = require("express");
const Assessment = require("../models/assessmentModel");
const router = express.Router();

// Create an assessment
router.post("/", async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const assessment = new Assessment({ title, description, dueDate });
    await assessment.save();
    res.status(201).json(assessment);
  } catch (error) {
    res.status(400).json({ error: "Failed to create assessment" });
  }
});

// Read all assessments
router.get("/", async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assessments" });
  }
});

// Read a single assessment by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const assessment = await Assessment.findById(id);
    if (assessment) {
      res.json(assessment);
    } else {
      res.status(404).json({ error: "Assessment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assessment" });
  }
});

// Update an assessment
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate } = req.body;
  try {
    const assessment = await Assessment.findByIdAndUpdate(
      id,
      { title, description, dueDate },
      { new: true }
    );
    if (assessment) {
      res.json(assessment);
    } else {
      res.status(404).json({ error: "Assessment not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to update assessment" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const assessment = await Assessment.findByIdAndDelete(id);
    if (assessment) {
      res.json({ message: "Assessment deleted successfully" });
    } else {
      res.status(404).json({ error: "Assessment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete assessment" });
  }
});

module.exports = router;
