const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  gym: {
    type: mongoose.Schema.ObjectId,
    ref: "Gym"
  },
  leader: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = mongoose.model("Team", teamSchema, "teams");
