const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');
const { ensureAuthenticated, ensureRole } = require('../middleware/roleMiddleware');

router.get('/meetings', ensureAuthenticated, meetingController.getMeetings);
router.post('/book-meeting', ensureAuthenticated, meetingController.bookMeeting);

// Routes for club leaders
router.get('/meetings/manage', ensureRole('leader'), meetingController.manageMeetings);
router.post('/meetings/create', ensureRole('leader'), meetingController.createMeeting);
router.post('/meetings/edit/:id', ensureRole('leader'), meetingController.editMeeting);
router.post('/meetings/delete/:id', ensureRole('leader'), meetingController.deleteMeeting);
router.get('/booked-meetings', ensureRole('leader'), meetingController.getBookedMeetings);

module.exports = router;
