const Sequelize=require('sequelize');
const db = require("../config/database");

const User = db.define('users', {
   Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Email: { 
    type: Sequelize.STRING,
    allowNull: false,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = User;


