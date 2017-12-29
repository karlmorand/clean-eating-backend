const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		trim: true,
		required: 'Please supply a name'
	},
	authId: {
		type: String,
		required: true
	},
	dailyEnties: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'DailyEntry'
		}
	],
	challengeFoodLevel: {
		type: Number,
		min: 1,
		default: 1
	}
});

module.exports = mongoose.model('User', userSchema);
