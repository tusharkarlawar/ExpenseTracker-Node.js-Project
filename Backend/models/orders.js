const Sequelize=require('sequelize');
const db = require("../config/database");

  const Order = db.define('order', {
   id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true

  },
  paymentid:Sequelize.STRING,
  orderid: Sequelize.STRING,
  status: Sequelize.STRING
  
})

module.exports = Order;