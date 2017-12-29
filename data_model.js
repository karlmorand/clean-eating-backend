

user: {
  _id: Mongo ID,
  auth_id: uid from FB,
  settings: {
    challenge_food_level: Number,
    display_name: String,
  },
  // gym: Mongo ID of gym,

  entries:[array of entry ids],
  // denormalize the entries??? might want to denormalize the total points for each entry so calculating a user's total score could be fast
},

daily_entry: {
  _id: Mongo ID,
  owner: Mongo ID of user who created entry,
  entry_total: Number,
  entry_questions:[]
},

// gym:{ hardcoded for now in V1
//   _id: Mongo ID,
//   gym_owners:[array of Mongo IDs of gym owners user records]
//   members: [array of Mongo IDs of gym members],
//   // daily_questions:[array of question objects] might need something like this in the futre when i have many gyms and the ability to edit questions or create new ones for each gym, for now they'll be hardcoded
// }
