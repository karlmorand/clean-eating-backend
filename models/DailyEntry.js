const mongoose = require('mongoose');

const dailyEntrySchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	gym: {
		type: mongoose.Schema.ObjectId,
		ref: 'Gym'
	},
	authId: String,
	date: {
		type: Date,
		default: Date.now
	},
	entryTotal: {
		type: Number,
		min: 0,
		// QUESTION: Not sure if I should have a default value for daily entry total
		// TODO: Decide when and how the entry total will be calculated/updated...or should it even be a property, as opposed to calculating it when needed
		default: 0
	},
	entryQuestions: [
		{
			questionTitle: String,
			description: String,
			maxDailyPoints: Number,
			startingValue: Number,
			currentValue: {
				type: Number,
				default: 0
			},
			userInput: {
				type: String,
				default: ''
			},
			questionType: String //YESNO, SLIDER, TEXTENTRY
		}
	]
});

module.exports = mongoose.model('DailyEntry', dailyEntrySchema, 'dailyEntries');
