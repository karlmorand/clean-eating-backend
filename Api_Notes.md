Routes:
GET /dailyentry/:date - given a date it finds the entry from that date

* to prevent issues where this route wouldnt have n entry to return will need to setup bakground job to run each day to create entries for everyone, even if they're blank... bettewr to have a blank entry then a gap...BUT this means each days entry total points should start at 0, not 5 with food counting down...food input will need to be reconfigured so blank days can just be 0
