const express = require('express');

// creating router instace
const router = express.Router();

// importing controllers
const userController = require('../controller/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router;