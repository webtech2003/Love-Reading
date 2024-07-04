const Story = require('../models/Story');

exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find({}).populate('author');
    res.render('stories', { stories });
  } catch (err) {
    res.send('Error fetching stories');
  }
};

exports.postStory = async (req, res) => {
  try {
    const newStory = new Story({
      title: req.body.title,
      content: req.body.content,
      author: req.user._id,
    });
    await newStory.save();
    res.redirect('/stories');
  } catch (err) {
    res.send('Error posting story');
  }
};
