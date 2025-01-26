const userTask = require('../Model/userTask')

exports.updateTask=(req,res,next)=>{
  const {id, priority} = req.body;

  // console.log(id, priority)

  userTask.updateOne({_id:id},{$set:{priority:priority}}).then((success)=>{
    res.status(201).json({message:'priority updated'})
  }).catch((error)=>{
    console.log(error)
  })
}