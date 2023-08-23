const express = require('express');
const expenseController= require('../controllers/expenseController');
const userAuthentication = require('../middleware/auth')
const router = express.Router();

router.get('/', userAuthentication.authenticate, expenseController.getExpense);
router.post('/', userAuthentication.authenticate, expenseController.createExpense);
router.delete('/:id', userAuthentication.authenticate, expenseController.deleteExpense);

module.exports = router;