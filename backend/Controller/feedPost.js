const feed = require('../Model/feedPost')

exports.feedPost=(req,res,next)=>{
  feed.find().then((posts)=>{
    res.status(201).json({posts})
  }).catch((error)=>{
    console.log(error)
  })
}