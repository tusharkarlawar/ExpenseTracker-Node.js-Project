const Sequelize=require('sequelize');
const db = require("../config/database");

const Expense = db.define('expenseData', {
    expenseamount: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Expense;