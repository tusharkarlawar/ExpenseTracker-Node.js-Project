const User = require('../models/user');



// Create a user
exports.createUser = async (req, res) => {
  
  const email=req.body.email;
  const password=req.body.password;

 
  const existingUser = await User.findOne({ where: { email: email } });
  const PasswordCheck = await User.findOne({ where: { password: password } });
        if (existingUser) {
          if(PasswordCheck){
            const newUser = await User.create({email: email,password:password});

    res.json(newUser);
        }
        else{
          res.status(401).json({ error: 'User not authorized' });
        }
      }
else{
  res.status(404).json({ error: 'User not found' });
  }
};