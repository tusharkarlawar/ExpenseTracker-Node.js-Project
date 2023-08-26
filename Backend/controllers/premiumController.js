const Expense = require('../models/expense'); 
const User = require('../models/user') 
const sequelize = require('../config/database') 
const e = require('express') 
 
const getUserLeaderBoard = async(req,res) => { 
    try{ 
         
        const leaderboardusers = await User.findAll({ 
            attributes: ['id','name',[sequelize.fn('sum',sequelize.col('expenseData.expenseamount')), 'total_cost']], 
            include: [ 
                { 
                    model: Expense, 
                    attributes: [] 
                } 
            ], 
            group:['user.id'], 
            order:[['total_cost','DESC']] 
        }) 
        res.status(200).json(leaderboardusers) 
    } 
    catch(err){ 
        console.log(err) 
        res.status(500).json(err) 
    } 
} 
 
module.exports={ 
    getUserLeaderBoard 
}