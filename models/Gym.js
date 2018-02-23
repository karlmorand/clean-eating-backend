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
      enabled: Boolean,
      startingValue: Number,
      maxWeeklyPoints: Number,
      questionType: String //YESNO, SLIDER, TEXTENTRY
    }
  ],
  foodGude: {
    type: String,
    trim: true
  },
  shoppingList: [
    {
      sectionTitle: String,
      items: [String]
    }
  ]
});

module.exports = mongoose.model("Gym", gymSchema, "gyms");
