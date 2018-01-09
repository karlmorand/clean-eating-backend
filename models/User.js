const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Please supply a name'
	},
	email: {
		type: String,
		trim: true
	},
	authId: {
		type: String,
		required: true
	},
	roles: [String],
	currentQuestions: [],
	currentDailyEntries: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'DailyEntry'
		}
	],
	challengeFoodLevel: {
		type: Number,
		min: 1,
		default: 1
	},
	gym: {
		type: mongoose.Schema.ObjectId,
		ref: 'Gym'
	},
	onboardingComplete: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('User', userSchema, 'users');
