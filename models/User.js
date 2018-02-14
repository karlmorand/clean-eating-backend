const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please supply a name"
  },
  email: {
    type: String,
    trim: true
  },
  picture: {
    type: String,
    trim: true
  },
  authId: {
    type: String,
    required: true
  },
  roles: [String],
  currentQuestions: [],
  challengeLevel: {
    type: Number,
    min: 0,
    default: 1
  },
  gym: {
    type: mongoose.Schema.ObjectId,
    ref: "Gym"
  },
  team: {
    type: mongoose.Schema.ObjectId,
    ref: "Team"
  },
  onboardingComplete: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("User", userSchema, "users");
