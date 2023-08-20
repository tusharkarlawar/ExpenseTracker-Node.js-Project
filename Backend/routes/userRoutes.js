const express = require('express');
const userController= require('../controllers/userController');

const router = express.Router();

router.post('/SignUp', userController.createUser);

router.post('/Login', userController.LoginUser);


module.exports = router;//