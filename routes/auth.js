const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', authController.register);
router.post('/register', authController.postRegister);

router.get('/login', authController.login);
router.post('/login', authController.postLogin);

router.get('/logout', authController.logout);

module.exports = router;
