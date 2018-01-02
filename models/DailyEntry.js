const mongoose = require('mongoose');

const dailyEntrySchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	entry_total: {
		type: Number,
		min: 0
		// QUESTION: Not sure if I should have a default value for daily entry total
		// default: 5
	},
	entry_questions: [
		{
			questionTitle: String,
			description: String,
			maxDailyPoints: Number,
			startingValue: Number,
			questionType: String //YESNO, SLIDER, TEXTENTRY
		}
	]
});

module.exports = mongoose.model('DailyEntry', dailyEntrySchema);
