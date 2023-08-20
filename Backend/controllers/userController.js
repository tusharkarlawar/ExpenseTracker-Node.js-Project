const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  const Name = req.body.Name;
  const Email = req.body.Email;
  const Password = req.body.Password;
  const existingUser = await User.findOne({ where: { Email: Email } });
  if (existingUser) {
      res.status(403).json({ error: 'Email already exists in the database' });
  }
else{
  try { 
    const saltrounds = 10;
    bcrypt.hash(Password,saltrounds,async(err,hash) => {
      console.log(err)
        
    const newUser = await User.create({Name:Name,Email:Email,Password:hash});
        
    res.json(newUser);
})
  } catch(error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
};

exports.LoginUser = async (req, res) => {
  const Name = req.body.Name;
  const Password = req.body.Password;

  const existingUser = await User.findOne({ where: { Name: Name } });
        if (existingUser) {
            bcrypt.compare(Password,existingUser.Password,(err,result)=>{
            if(result == true){
            res.json({ message: 'Logged in successfully', user: existingUser });
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