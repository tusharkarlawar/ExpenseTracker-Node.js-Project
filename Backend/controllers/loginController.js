const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');//

exports.LoginUser = async (req, res) => {
    const Name = req.body.Name;
    const Password = req.body.Password;

    const generateAccessToken = (id, name, ispremiumuser) => {
      return jwt.sign({UserId:id, name: name, ispremiumuser},'tushartushar')
    }
  
    const existingUser = await User.findOne({ where: { Name: Name } });
          if (existingUser) {
              bcrypt.compare(Password,existingUser.Password,(err,result)=>{
              if(result == true){
              // res.json({ message: 'Logged in successfully', user: existingUser });
              //res.json({ message: 'Logged in successfully', token: generateAccessToken(existingUser.id) });
              res.json({ message: 'Logged in successfully', token: generateAccessToken(existingUser.id, existingUser.name,existingUser.ispremiumuser) });

             }
             else{
               res.status(401).json({ error: 'User not authorized' });
            }
          })
         }
     else{
       res.status(404).json({ error: 'User not found' });
      }
  };