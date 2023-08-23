const express = require('express');
const loginController= require('../controllers/loginController');

const router = express.Router();

router.post('/Login', loginController.LoginUser);

module.exports = router;