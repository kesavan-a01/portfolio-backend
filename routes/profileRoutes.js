const express = require("express");
const router = express.Router();

const Profile = require("../models/Profile");
const authMiddleware = require("../middleware/authMiddleware");

// GET logged in user's profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET public profile by user id (for viewing the portfolio like a public page)
router.get("/public/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// UPDATE profile (basic info + image)
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { name, bio, profileImage, githubLink, linkedinLink } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.userId },
      { name, bio, profileImage, githubLink, linkedinLink },
      { new: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// UPDATE a whole section at once (education, skills, experience, projects, certifications, achievements)
// sectionName comes from the URL, and the new array comes in req.body.data
router.put("/section/:sectionName", authMiddleware, async (req, res) => {
  try {
    const allowedSections = [
      "education",
      "skills",
      "experience",
      "projects",
      "certifications",
      "achievements",
    ];

    const { sectionName } = req.params;

    if (!allowedSections.includes(sectionName)) {
      return res.status(400).json({ message: "Invalid section name" });
    }

    const updateData = { [sectionName]: req.body.data };

    const profile = await Profile.findOneAndUpdate(
      { user: req.userId },
      updateData,
      { new: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
