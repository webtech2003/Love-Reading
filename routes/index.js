const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Meeting = require('../models/Meeting');
const Story = require('../models/Story');

router.get('/', async (req, res) => {
  try {
    const meetings = await Meeting.find({}).limit(5);
    const stories = await Story.find({}).populate('author').limit(5);
    res.render('index', { meetings, stories });
  } catch (err) {
    res.send('Error fetching meetings or stories');
  }
});

router.get('/members', userController.getMembers);
router.get('/general-info', userController.getGeneralInfo);
router.post('/update-info', userController.updateGeneralInfo);

module.exports = router;
