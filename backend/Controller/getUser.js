const jwt = require('jsonwebtoken');
const Signup = require('../Model/userSignup'); 

exports.getUser = (req, res, next) => {
  const {id} = req.userId;

  Signup.findOne({_id:id}).then((success)=>{
    // console.log(success)
    res.status(201).json({success})
  }).catch((error)=>{
    console.log(error)
  })

};
