const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please supply a name"
  },
  currentQuestions: [
    {
      questionTitle: String,
      description: String,
      maxDailyPoints: Number,
      startingValue: Number,
      questionType: String //YESNO, SLIDER, TEXTENTRY
    }
  ],
  foodGuide: [
    {
      sectionTitle: String,
      items: [String]
    }
  ]
});

module.exports = mongoose.model("Gym", gymSchema, "gyms");
