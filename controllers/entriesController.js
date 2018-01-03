const mongoose = require('mongoose');
const User = mongoose.model('User');
const DailyEntry = mongoose.model('DailyEntry');
const Gym = mongoose.model('Gym');

exports.getDailyEntry = (req, res) => {
	console.log('getting daily entry');
	console.log(req.body);
	res.send('Get daily entry route');
	//check if user is in the DB

	//search the daily entries that match their UID and the req's date
};
