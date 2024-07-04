const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  title: String,
  description: String,
  suggestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  accepted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Discussion', discussionSchema);
