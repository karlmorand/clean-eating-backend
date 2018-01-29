const mongoose = require('mongoose');
const User = mongoose.model('User');
const DailyEntry = mongoose.model('DailyEntry');
const Gym = mongoose.model('Gym');

// var endOfDay = require('date-fns/end_of_day');
// var startOfDay = require('date-fns/start_of_day');
// TODO: cleanup the callback hell here, use async
// TODO: Sometimes on page refresh (when not logging in, but going back to the page after a while), no user is found b/c the info isn't passed, which cuases a fatal error
exports.getDailyEntry = (req, res) => {
	console.log('Getting daily entry');
	const dayStart = new Date(parseInt(req.params.date));
	dayStart.setHours(0, 0, 0, 0);
	console.log(
		'SEARCHING FOR THIS DATE RANGE: ',
		dayStart.toISOString(),
		new Date(parseInt(req.params.date)).toISOString()
	);
	DailyEntry.findOne({
		owner: req.params.id,
		date: {
			$gte: dayStart.toISOString(),
			$lte: new Date(parseInt(req.params.date)).toISOString()
		}
	}).exec((err, entry) => {
		console.log('EXEC the daily entry find');
		if (err) {
			console.log('ERROR finding an entry');
			console.log(err);
			return err;
		}
		if (!entry) {
			console.log('No entry for today yet, making one, finding the user first');
			User.findOne({ _id: req.params.id }).exec((err, user) => {
				if (err) {
					console.log(err);
					return err;
				}
				DailyEntry.create(
					{
						authId: user.authId,
						owner: req.params.id,
						entryQuestions: user.currentQuestions,
						gym: user.gym,
						date: new Date(parseInt(req.params.date)).toISOString()
					},
					(err, newDailyEntry) => {
						if (err) {
							console.log(err);
							return err;
						}
						console.log('Created the new entry, sending now');
						res.send(newDailyEntry);
					}
				);
			});
		} else {
			console.log('MATCHING ENTRIES FOUND: ', entry);
			res.send(entry);
		}
	});
}; // see if a daily entry for today exists for the user, if so return it // if there isn't one create one based on the user's 'current questions' array (which is based on their gym, but stored on the user not the gym so i don't have to keep looking up the gym...the user's current questions are only changed when the gym is changed...and when a user is created, and chooses a gym, their 'current questions' prop is populated with their gym's ) //check if user is in the DB //search the daily entries that match their UID and the req's date // TODO: Make sure workouts are limited to 5 points per week

exports.updateDailyEntryScore = (req, res) => {
	console.log('UPDATE DAILY ENTRY');
	console.log(req.body);

	// Post answers in a req.body.updatedAnswers array with the format : updatedAnswers: [{_id: ObjectId, newValue: Number}]
	DailyEntry.findOne({ _id: req.params.entryId }, (err, entry) => {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			const { updatedAnswer } = req.body;
			let question = entry.entryQuestions.id(updatedAnswer._id);
			question.currentValue = updatedAnswer.newValue;
			entry.save((err, updatedEntry) => {
				if (err) {
					console.log(err);
					res.send(err);
				} else {
					res.send(updatedEntry);
				}
			});
		}
	});
};
