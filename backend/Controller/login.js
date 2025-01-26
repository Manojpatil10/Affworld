const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Signup = require('../Model/userSignup');

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  Signup.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed: User not found' });
      }

      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(401).json({ message: 'Authentication failed: Incorrect password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '5h' });
        const username = user.username

        res.status(200).json({ message: 'Authentication successful', token , username });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'An error occurred during authentication' });
    });
};
