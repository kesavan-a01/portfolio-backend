const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: { type: String, default: "" },
  bio: { type: String, default: "" },
  profileImage: { type: String, default: "" }, // base64 string or image url

  // simple text fields for links
  githubLink: { type: String, default: "" },
  linkedinLink: { type: String, default: "" },

  education: [
    {
      degree: String,
      institution: String,
      year: String,
    },
  ],

  skills: [
    {
      name: String,
    },
  ],

  experience: [
    {
      role: String,
      company: String,
      duration: String,
      description: String,
    },
  ],

  projects: [
    {
      title: String,
      description: String,
      link: String, // live project or demo link
    },
  ],

  certifications: [
    {
      title: String,
      issuedBy: String,
      link: String, // verify link
    },
  ],

  achievements: [
    {
      title: String,
      description: String,
    },
  ],
});

module.exports = mongoose.model("Profile", profileSchema);
