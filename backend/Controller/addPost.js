const feed = require('../Model/feedPost')

exports.addPost = (req, res, next) => {
  const { caption, photoUrl, date, author } = req.body;
  const id = req.userId;

  const newPost = new feed({
    caption: caption,
    photoUrl: photoUrl,
    date: date,
    author: author,
    userId: id,
  });

  newPost.save()
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully',
      });
    })
    .catch(err => {
      // console.error(err);
      res.status(500).json({
        message: 'Failed to create post',
      });
    });
}
