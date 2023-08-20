const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const sequelize=require('./config/database');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

sequelize.sync()
.then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
});