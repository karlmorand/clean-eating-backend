const mongoose = require('mongoose');
const User = mongoose.model('User');
const DailyEntry = mongoose.model('DailyEntry');
const Gym = mongoose.model('Gym');
const isToday = require('date-fns/is_today');
// might want to use date-fns for date issues
// TODO: cleanup the callback hell here, use async
// TODO: Sometimes on page refresh (when not logging in, but going back to the page after a while), no user is found b/c the info isn't passed, which cuases a fatal error
exports.getDailyEntry = (req, res) => {
	console.log('Getting daily entry');
	let entryToReturn;
	User.findOne({ _id: req.params.id })
		.populate('currentDailyEntries')
		.exec((err, user) => {
			// function to check if the entry is from today
			const entryIsToday = entry => {
				console.log('ENTRY TODAY: ', isToday(entry.date));
				return isToday(entry.date);
			};

			entryToReturn = user.currentDailyEntries.find(entryIsToday);
			if (!entryToReturn) {
				console.log('No entry for today yet, making one');
				// TODO: Make sure the entries aren't saved if they can't be/aren't added to the user...otherwise they're just out there floating around
				DailyEntry.create({ authId: user.authId, owner: user._id, entryQuestions: user.currentQuestions }, function(
					err,
					newDailyEntry
				) {
					if (err) {
						console.log(err);
						return err;
					}
					console.log('Pushing entry to user');
					user.currentDailyEntries.push(newDailyEntry._id);
					user.save((err, updatedUser) => {
						if (err) {
							console.log('Error saving user: ', err);
							return err;
						}
						console.log('Updated user: ', updatedUser);
						res.send(newDailyEntry);
					});
				});
			} else {
				res.send(entryToReturn);
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
