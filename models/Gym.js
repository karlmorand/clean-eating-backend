const mongoose = require('mongoose');

const gymSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Please supply a name'
	},
	members: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'User'
		}
	],
	currentQuestions: [
		{
			questionTitle: String,
			description: String,
			maxDailyPoints: Number,
			startingValue: Number,
			maxWeeklyPoints: Number, // TODO: make sure having it here doesn't cause it to be required and thus cause errors for q's that don't have maxWeeklyPoints set
			questionType: String //YESNO, SLIDER, TEXTENTRY
		}
	]
});

module.exports = mongoose.model('Gym', gymSchema, 'gyms');
