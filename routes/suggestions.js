const express = require('express');
const router = express.Router();
const suggestionController = require('../controllers/suggestionController');
const { ensureAuthenticated, ensureRole } = require('../middleware/roleMiddleware');

router.get('/suggestions', ensureAuthenticated, suggestionController.getSuggestions);
router.post('/submit-suggestion', ensureAuthenticated, suggestionController.postSuggestion);

// Routes for club leaders
router.post('/suggestions/approve/:id', ensureRole('leader'), suggestionController.approveSuggestion);
router.post('/suggestions/delete/:id', ensureRole('leader'), suggestionController.deleteSuggestion);

module.exports = router;
