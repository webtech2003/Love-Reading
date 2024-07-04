const mongoose = require('mongoose');

const generalInfoSchema = new mongoose.Schema({
  info: String,
});

module.exports = mongoose.model('GeneralInfo', generalInfoSchema);
