const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  title: String,
  description: String,
  relatedTo: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Suggestion', suggestionSchema);
