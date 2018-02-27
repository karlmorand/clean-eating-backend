#!/usr/bin/env node

var mongoose = require("mongoose");
const User = require("./models/User.js");

User.find({}).exec((err, users) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`***** Found ${users.length} users *****`);
  }
});
