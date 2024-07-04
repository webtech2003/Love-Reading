const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');
const { ensureAuthenticated, ensureRole } = require('../middleware/roleMiddleware');

router.get('/future-discussions', ensureAuthenticated, discussionController.getFutureDiscussions);
router.post('/suggest-discussion', ensureAuthenticated, discussionController.suggestDiscussion);

// Routes for club leaders
router.post('/accept-discussion', ensureRole('leader'), discussionController.acceptDiscussion);

module.exports = router;
