const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const loginRoutes = require('./routes/loginRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const premiumRoutes = require('./routes/premiumRoutes');
const sequelize=require('./config/database');
const Expense = require('./models/expense');
const User = require('./models/user');
const Order = require('./models/orders');
const app = express();

app.use(cors());
app.use(express.json());
// app.use('/api/SignUpData', userRoutes);
// app.use('/api/SignUpData', loginRoutes);
app.use('/api/User', userRoutes);
app.use('/api/User', loginRoutes);
app.use('/api/expenseData', expenseRoutes);
app.use('/api', purchaseRoutes);
app.use('/api/premium', premiumRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
.then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
});