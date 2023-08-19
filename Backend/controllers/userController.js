const User = require('../models/user');

const bcrypt = require('bcrypt');



// Create a user
exports.createUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      // Compare the provided password with the hashed password from the database
      const passwordCheck = await bcrypt.compare(password, existingUser.password);

      if (passwordCheck) {
        res.status(409).json({ error: 'User already exists' });
      } else {
        res.status(401).json({ error: 'User not authorized' });
      }
    } else {
      // Hash the password before storing it in the database

      const hashedPassword = await bcrypt.hash(password, 15);
      const newUser = await User.create({ email: email, password: hashedPassword });

      res.json(newUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};