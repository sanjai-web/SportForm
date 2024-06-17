// models/team.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  players: {
    type: [String],
    required: true
  }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
