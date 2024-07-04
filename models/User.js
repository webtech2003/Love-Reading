const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: { type: String, required: true },
  role: {
    type: String,
    enum: ['leader', 'member'],
    default: 'member'
  },
  profile: {
    bio: String,
    stories: [String],
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);


