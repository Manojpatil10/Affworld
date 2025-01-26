const feed = require('../Model/feedPost');

exports.deteteTask=(req,res,next)=>{
  const {id} = req.params

  // console.log(id)

  feed.deleteOne({_id:id}).then((success)=>{
    res.status(201).json({message:'task deleted'})
  }).catch((error)=>{
    console.log(error)
  })
}