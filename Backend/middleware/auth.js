const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = (req,res,next) =>{
    try{
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token,'tushartushar');
        console.log('userId>>>>',user.UserId)
        User.findByPk(user.UserId).then(user => {
        //     console.log('SignUpDatumId>>>>',user.SignUpDatumId)
        // User.findByPk(user.SignUpDatumId).then(user => {
            console.log(JSON.stringify(user));
            req.user=user;
            next();
        })
    }
    catch(err){
        return res.status(401).json({success: false})
    }
}

module.exports={authenticate}