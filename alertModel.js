var mongoose = require("mongoose");

// Setup schema
var alertSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
});

// Export Contact model
var Alert = (module.exports = mongoose.model("alert", alertSchema));

module.exports.get = function(callback, limit) {
  Alert.find(callback).limit(limit);
};
