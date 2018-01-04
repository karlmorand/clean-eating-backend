const mongoose = require('mongoose');
const User = mongoose.model('User');
const DailyEntry = mongoose.model('DailyEntry');
const Gym = mongoose.model('Gym');
// might want to use date-fns for date issues

exports.getDailyEntry = (req, res) => {
	console.log('HEADERS: ', req.params);
	res.send('Get daily entry namez');

	// see if a daily entry for today exists for the user, if so return it
	// if there isn't one create one based on the user's 'current questions' array (which is based on their gym, but stored on the user not the gym so i don't have to keep looking up the gym...the user's current questions are only changed when the gym is changed...and when a user is created, and chooses a gym, their 'current questions' prop is populated with their gym's )
	//check if user is in the DB

	//search the daily entries that match their UID and the req's date
};
