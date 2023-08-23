const Expense = require('../models/expense');
const jwt = require('jsonwebtoken');
const secretKey = 'tushartushar';

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
  // const id = req.body.id;
  const expenseamount=req.body.expenseamount;
  const description=req.body.description;
  const category=req.body.category;
  // const UserId=req.body.UserId;

  try {
    const newExpense = await Expense.create({expenseamount:expenseamount, description:description, category:category, UserId:req.user.id });
    res.json(newExpense);
  } catch (error) {
    console.log("errooorr");
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

    await expense.destroy({
      where: {UserId: req.user.id}});
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};