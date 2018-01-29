const mongoose = require('mongoose');
const User = mongoose.model('User');
const DailyEntry = mongoose.model('DailyEntry');
const Gym = mongoose.model('Gym');

exports.getLeaderboard = (req, res) => {
	let leaderboardResults = [];
	DailyEntry.find({ gym: req.params.gymId })
		.populate('owner', 'name picture')
		.exec((err, dailyEntries) => {
			if (err) {
				console.log(err);
				return err;
			}
			//loop over dailyEntries, add each value to a running list of each person, return [{_id:String, name:String, total: Number}]
			dailyEntries.forEach(entry => {
				let existingEntry = leaderboardResults.find(leaderboard => {
					return leaderboard.id === entry.owner.id;
				});

				if (existingEntry) {
					existingEntry.total += entry.entryTotal;
				} else {
					leaderboardResults.push({
						id: entry.owner.id,
						total: entry.entryTotal,
						name: entry.owner.name,
						picture: entry.owner.picture
					});
				}
			});
			res.send(leaderboardResults);
		});
};
