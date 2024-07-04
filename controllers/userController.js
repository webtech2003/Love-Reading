const User = require('../models/User');
const GeneralInfo = require('../models/GeneralInfo');

exports.getProfile = async (req, res) => {
  try {
    res.render('profile', { user: req.user });
  } catch (err) {
    res.send('Error fetching profile');
  }
};

// Club leader functionalities
exports.getMembers = async (req, res) => {
  try {
    const members = await User.find({});
    res.render('members', { members });
  } catch (err) {
    res.send('Error fetching members');
  }
};

exports.getGeneralInfo = async (req, res) => {
  try {
    const generalInfo = await GeneralInfo.findOne({});
    res.render('generalInfo', { info: generalInfo ? generalInfo.info : '' });
  } catch (err) {
    res.send('Error fetching general information');
  }
};

exports.updateGeneralInfo = async (req, res) => {
  try {
    let generalInfo = await GeneralInfo.findOne({});
    if (!generalInfo) {
      generalInfo = new GeneralInfo({ info: req.body.info });
    } else {
      generalInfo.info = req.body.info;
    }
    await generalInfo.save();
    res.redirect('/general-info');
  } catch (err) {
    res.send('Error updating general information');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email, bio } = req.body;
    const user = await User.findById(req.user._id);
    user.username = username;
    user.email = email;
    user.profile.bio = bio;
    await user.save();
    res.redirect('/profile');
  } catch (err) {
    res.send('Error updating profile');
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('userProfile', { user });
  } catch (err) {
    res.send('Error fetching user profile');
  }
};
