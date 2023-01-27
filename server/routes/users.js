const express = require('express');
const getUser = require('../controllers/users.js');
// import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
// dodaj verifyToken

router.get('/:id', getUser);

module.exports = router;
