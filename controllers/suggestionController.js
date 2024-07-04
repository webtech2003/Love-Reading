const Suggestion = require('../models/Suggestion');

exports.getSuggestions = async (req, res) => {
  try {
    const suggestions = await Suggestion.find({}).populate('author');
    res.render('suggestions', { suggestions });
  } catch (err) {
    res.send('Error fetching suggestions');
  }
};

exports.postSuggestion = async (req, res) => {
  try {
    const newSuggestion = new Suggestion({
      title: req.body.title,
      relatedTo: req.body.relatedTo,
      description: req.body.description,
      author: req.user._id,
    });
    await newSuggestion.save();
    res.redirect('/suggestions');
  } catch (err) {
    res.send('Error submitting suggestion');
  }
};

// Club leader functionalities
exports.approveSuggestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Suggestion.findByIdAndUpdate(id, { approved: true });
    res.redirect('/suggestions');
  } catch (err) {
    res.send('Error approving suggestion');
  }
};

exports.deleteSuggestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Suggestion.findByIdAndDelete(id);
    res.redirect('/suggestions');
  } catch (err) {
    res.send('Error deleting suggestion');
  }
};
