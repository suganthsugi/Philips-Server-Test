const express = require('express');
const router = express.Router();

// importing the user controller
const userController = require('../controllers/userController')

// importing the auth middleware
const authToken = require('../middlewares/authToken')

router.route('/profile').get(authToken.authToken, userController.getUserDetail);

module.exports = router;