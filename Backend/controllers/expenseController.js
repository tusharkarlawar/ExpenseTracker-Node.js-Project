const Expense = require('../models/expense');

// Get all users
exports.getExpense = async (req, res) => {
  try {
    const users = await Expense.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create a user
exports.createExpense = async (req, res) => {
  const expense_amount = req.body.expense_amount;
  const description=req.body.description;
  const category=req.body.category;

  try {
    const newUser = await Expense.create({ expense_amount:expense_amount, description:description, category:category });
    res.json(newUser);
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete a user
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Expense.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};