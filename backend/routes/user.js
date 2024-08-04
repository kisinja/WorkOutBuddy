const express = require('express');
const { loginUser, registerUser } = require('../controllers/user');

const router = express.Router();

// login route
router.post("/login", loginUser);

// register route
router.post("/signup", registerUser);

module.exports = router;