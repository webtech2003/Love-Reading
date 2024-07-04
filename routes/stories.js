const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');
const { ensureAuthenticated, ensureRole } = require('../middleware/roleMiddleware');

router.get('/stories', ensureAuthenticated, storyController.getStories);
router.post('/post-story', ensureAuthenticated, storyController.postStory);

module.exports = router;
