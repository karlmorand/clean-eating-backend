Common DB Interactions:

* GET single user's entry for X date
* GET each user's challenge total in a gym

* POST single user's entry for X date
* UPDATE single user's entry for X date

* given the gym id of the current user what are the totals of every other person at that gym

  * overall totals for each person
  * totals for current week

* for current user access each daily record to view/update the data

* for current user acess daily totals for a certain date range to create data viz for just their data, not gym-wide data

- daily entries need to be organized/accessed by user and by gym

* At midnight and when user opens the app and a new daily entry hasn't been created......server uses the user's UID to get their gym (denormalize the gym id?) and the set of current questions for the gym, takes each item in that array and pushes it into a new daily entry document which is then

Initial flow:

* user signs up
  * Auth0 creates an account for them, gives them scope of Athlete and adds them to the Mongo db
  * onboarding complete flag set to false in mongodb
