const sequelize = require('../config/database');
const Expense = require('../models/expense');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = 'tushartushar';
//const sequelize = require('../config/database');

// Get all expense//
exports.getExpense = async (req, res) => {
  try {
    const expenses = await Expense.findAll(
      {
      where: {UserId: req.user.id}}
      )
    res.json(expenses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create a expense
exports.createExpense = async (req, res) => {
  const t = await sequelize.transaction();

  const expenseamount=req.body.expenseamount;
  const description=req.body.description;
  const category=req.body.category;

  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

 
 
  try {
    const newExpense = await Expense.create({expenseamount:expenseamount, description:description, category:category, UserId:req.user.id, transaction:t });
    const totalExpense = Number(req.user.totalExpenses)+Number(expenseamount)
    console.log(totalExpense)
    await User.update(
      {totalExpenses:totalExpense},
      {
      where: {id: req.user.id},
      transaction:t
      }
    );
    
      await t.commit();
      res.status(200).json({expense: newExpense})
    
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json({ error: 'expense not found' });
    }
    if (expense.UserId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const deletedExpenseAmount = expense.expenseamount;// Calculate the deleted expense amount
    await expense.destroy();

    // Update the user's total expenses
    const updatedTotalExpenses = req.user.totalExpenses - deletedExpenseAmount;  
    await User.update({
      totalExpenses:updatedTotalExpenses},{
        where: {id: req.user.id},
      });
      res.json({ message: 'Expense deleted successfully' });
   
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};