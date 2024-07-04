const Meeting = require('../models/Meeting');

exports.getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({});
    res.render('meetings', { meetings });
  } catch (err) {
    res.send('Error fetching meetings');
  }
};

exports.bookMeeting = async (req, res) => {
  const meetingId = req.body.meetingId;
  const userId = req.user._id;
  try {
    const meeting = await Meeting.findById(meetingId);
    if (!meeting.attendees.includes(userId)) {
      meeting.attendees.push(userId);
      await meeting.save();
    }
    res.redirect('/meetings');
  } catch (err) {
    res.send('Error booking meeting');
  }
};

exports.manageMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({});
    res.render('manageMeetings', { meetings });
  } catch (err) {
    res.send('Error fetching meetings');
  }
};

exports.createMeeting = async (req, res) => {
  try {
    const { title, description, date, time, location } = req.body;
    const newMeeting = new Meeting({ title, description, date, time, location });
    await newMeeting.save();
    res.redirect('/meetings/manage');
  } catch (err) {
    res.send('Error creating meeting');
  }
};

exports.editMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, time, location } = req.body;
    await Meeting.findByIdAndUpdate(id, { title, description, date, time, location });
    res.redirect('/meetings/manage');
  } catch (err) {
    res.send('Error editing meeting');
  }
};

exports.deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    await Meeting.findByIdAndDelete(id);
    res.redirect('/meetings/manage');
  } catch (err) {
    res.send('Error deleting meeting');
  }
};

exports.getBookedMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({}).populate('attendees');
    res.render('bookedMeetings', { meetings });
  } catch (err) {
    res.send('Error fetching booked meetings');
  }
};
