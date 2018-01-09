const mongoose = require('mongoose');
const User = mongoose.model('User');
const DailyEntry = mongoose.model('DailyEntry');
const Gym = mongoose.model('Gym');
const isToday = require('date-fns/is_today');
// might want to use date-fns for date issues
// TODO: cleanup the callback hell here, use async
exports.getDailyEntry = (req, res) => {
	let entryToReturn;
	User.findOne({ authId: req.params.authId })
		.populate('currentDailyEntries')
		.exec((err, user) => {
			// function to check if the entry is from today
			const entryIsToday = entry => {
				console.log('HERE');
				console.log(isToday(entry.date));
				return isToday(entry.date);
			};

			entryToReturn = user.currentDailyEntries.find(entryIsToday);
			if (!entryToReturn) {
				DailyEntry.create({ authId: user.authId, owner: user._id, entryQuestions: user.currentQuestions }, function(
					err,
					newDailyEntry
				) {
					if (err) {
						return err;
					}
					user.currentDailyEntries.push(newDailyEntry);
					user.save((err, updatedUser) => {
						if (err) {
							return err;
						}
						res.send(newDailyEntry);
					});
				});
			} else {
				res.send(entryToReturn);
			}
		});
}; // see if a daily entry for today exists for the user, if so return it // if there isn't one create one based on the user's 'current questions' array (which is based on their gym, but stored on the user not the gym so i don't have to keep looking up the gym...the user's current questions are only changed when the gym is changed...and when a user is created, and chooses a gym, their 'current questions' prop is populated with their gym's ) //check if user is in the DB //search the daily entries that match their UID and the req's date // TODO: Make sure workouts are limited to 5 points per week

exports.updateDailyEntryScore = (req, res) => {
	// Post answers in a req.body.updatedAnswers array with the format : updatedAnswers: [{_id: ObjectId, newValue: Number}]
	DailyEntry.findOne({ _id: req.params.entryId }, (err, entry) => {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			req.body.updatedAnswers.forEach(updatedAnswer => {
				let oldEntry = entry.entryQuestions.id(updatedAnswer._id);
				oldEntry.currentValue = updatedAnswer.newValue;
			});
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
