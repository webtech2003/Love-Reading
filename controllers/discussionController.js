const Discussion = require('../models/Discussion');

exports.getFutureDiscussions = async (req, res) => {
  try {
    const futureDiscussions = await Discussion.find({}).populate('suggestedBy');
    res.render('futureDiscussions', { futureDiscussions });
  } catch (err) {
    res.send('Error fetching discussions');
  }
};

exports.suggestDiscussion = async (req, res) => {
  try {
    const newDiscussion = new Discussion({
      title: req.body.title,
      description: req.body.description,
      suggestedBy: req.user._id,
    });
    await newDiscussion.save();
    res.redirect('/future-discussions');
  } catch (err) {
    res.send('Error suggesting discussion');
  }
};

// Club leader functionalities
exports.acceptDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.body.discussionId);
    discussion.accepted = true;
    await discussion.save();
    res.redirect('/future-discussions');
  } catch (err) {
    res.send('Error accepting discussion');
  }
};
