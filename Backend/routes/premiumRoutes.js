const express = require('express');
const premiumController = require('../controllers/premiumController');
const userAuthentication = require('../middleware/auth')

const router = express.Router();

router.get('/showLeaderBoard', userAuthentication.authenticate, premiumController.getUserLeaderBoard);

module.exports = router;//