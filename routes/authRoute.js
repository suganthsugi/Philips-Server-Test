const express = require('express');

// creating router instace
const router = express.Router();

// importing controllers
const authController = require('../controller/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);


module.exports = router;