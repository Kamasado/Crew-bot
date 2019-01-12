var mongoose = require("mongoose");

// Setup schema
var userSchema = mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  exp: {
    type: Number,
    default: 0
  },
  osuUser: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    enum: ["std", "mania"],
    required: true
  },
  quests: {
    type: Number,
    default: 0
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

// Export Contact model
var User = (module.exports = mongoose.model("user", userSchema));

module.exports.get = function(callback, limit) {
  User.find(callback).limit(limit);
};
