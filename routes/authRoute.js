const express = require('express');

// creating router instace
const router = express.Router();

// importing middlewares
// const authToken = require('../middlewares/authToken');

// importing controllers
const authController = require('../controllers/authController');

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

module.exports = router;