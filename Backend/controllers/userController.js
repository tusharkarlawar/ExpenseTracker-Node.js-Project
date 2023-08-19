const User = require('../models/user');



// Create a user
exports.createUser = async (req, res) => {
  
  const email=req.body.email;
  const password=req.body.password;

 
  const existingUser = await User.findOne({ where: { email:email,password:password } });
        if (existingUser) {
            res.status(400).json({ error: 'Email already exists in the database' });
        }
else{
  try { 

    const newUser = await User.create({email:email,password:password});

    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
}
};
