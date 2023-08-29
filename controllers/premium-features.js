const expense = require("../models/expense");
const user = require("../models/user"); 
const downloadFile = require("../models/download");
require('dotenv').config();
const AWS = require("aws-sdk");



exports.leaderboardDetails = async(req,res,next)=>{
    try{
        const leaderBoardOfUsers = await user.findAll({
            order: [['totalExpense', "DESC"]]
        });

        res.json(leaderBoardOfUsers);

    }catch(err){
        console.log(err);
    }
}