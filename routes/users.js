const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated, ensureRole } = require('../middleware/roleMiddleware');

// Routes for members
router.get('/profile', ensureAuthenticated, userController.getProfile);
router.post('/profile', ensureAuthenticated, userController.updateProfile);
router.get('/profile/:id', userController.getUserProfile);

// Routes for club leaders
router.get('/members', ensureRole('leader'), userController.getMembers);
router.get('/general-info', ensureRole('leader'), userController.getGeneralInfo);
router.post('/update-info', ensureRole('leader'), userController.updateGeneralInfo);

module.exports = router;
