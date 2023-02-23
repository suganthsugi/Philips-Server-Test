const express = require('express');

// creating router instace
const router = express.Router();

// importing middlewares
const authToken = require('../middlewares/authToken');

// importing controllers
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/testUser', authToken.authToken, authController.testUser);

module.exports = router;