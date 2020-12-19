const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

// 把数据库的东西导进来
// 然后loop array 然后传参给render 就解决了

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    //res.json(posts);
    res.render('maps', { p: posts });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: 'Server Error' });
  }
});

module.exports = router;
