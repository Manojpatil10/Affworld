const bcrypt = require('bcrypt');
const User = require('../Model/userSignup');

exports.updatePass = (req, res) => {
  const { email, newPassword } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "User Not exists" });
      }

      bcrypt
        .hash(newPassword, 10)
        .then((hashPassword) => {
          User.updateOne({ email }, { password: hashPassword })
            .then((isupdate) => {
              if (isupdate.acknowledged) {
                res.status(200).json({ message: "Password changed successfully" });
              }
            })
            .catch((error) => {
              console.log("Error updating password:", error);
              res.status(500).json({ message: "Failed to update password" });
            });
        })
        .catch((error) => {
          console.log("Error hashing password:", error);
          res.status(500).json({ message: "Failed to hash password" });
        });
    })
    .catch((error) => {
      console.log("Error finding user:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};
