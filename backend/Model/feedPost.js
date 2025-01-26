const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  date:{
    type:String,
    required: true
  },
  author:{
    type:String,
    required: true
  }
});

const Post = mongoose.model("feedPost", postSchema);

module.exports = Post;