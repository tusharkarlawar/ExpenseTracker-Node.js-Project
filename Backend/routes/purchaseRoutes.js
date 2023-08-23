const express = require('express');
const purchaseController= require('../controllers/purchaseController');
const userAuthentication = require('../middleware/auth')
const router = express.Router();

router.get('/premiummembership',userAuthentication.authenticate,purchaseController.purchasepremium);
router.post('/updatetransactionstatus', userAuthentication.authenticate, purchaseController.updateTransactionstatus);

module.exports = router;
