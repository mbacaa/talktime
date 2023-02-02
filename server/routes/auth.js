const express = require('express');
const { login, verifyEmail } = require('../controllers/auth.js');

const router = express.Router();

router.post('/login', login);

router.get('/verifyUser/:id', verifyEmail);

module.exports = router;
