const express = require('express');
const { registerUser } = require('../controller/userController.js');

const router = express.Router();

router.route("/register").post(registerUser);


module.exports = router; 