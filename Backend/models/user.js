const Sequelize=require('sequelize');
const db = require("../config/database");//

// const User = db.define('SignUpData', {
  const User = db.define('User', {
   Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Email: { 
    type: Sequelize.STRING,
    allowNull: false,
  },
  ConformEmail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ispremiumuser: {
    type: Sequelize.BOOLEAN,
    defaultValue: false, // Set default value to false for new users
  },
});

module.exports = User;

