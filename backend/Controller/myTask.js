const userTask = require('../Model/userTask')

exports.myTask=(req,res,next)=>{
  const id = req.userId;

  // console.log(id);


  userTask.find({userId:id}).then((tasks)=>{
    // console.log(tasks)

    res.status(201).json({tasks})
  }).catch((error)=>{
    console.log(error)
  })
}