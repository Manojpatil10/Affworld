const bcrypt = require('bcrypt');
const Signup = require('../Model/userSignup');

exports.signup = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      const newUser = new Signup({
        username,
        email,
        password: hashedPassword,
      });

      return newUser.save();
    })
    .then(() => {
      res.status(201).json({ message: 'User registered successfully!' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Error registering user' });
    });
};
