const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const categories = [
  'ideas',
  'artworks',
  'spotsaroundyou',
  'fashion',
  'activities',
  'events',
  'life',
];

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [
    auth,
    check('text', 'Text is required').not().isEmpty(),
    check('title', 'title is required').not().isEmpty(),
    check('imageUrl', 'image is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // invalid category
    // if (!categories.includes(req.body.category)) {
    //  return res.status(400).json({ msg: 'Please enter a valid category' });
    // }

    // we are logged in so we have the id of the user
    const user = await User.findById(req.user.id).select('-password');
    try {
      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        lat: req.body.lat,
        lng: req.body.lng,
        categories: req.body.categories,
        imageUrl: req.body.imageUrl,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Public

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); // most recent first
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public

router.get('/:id', async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);

    if (!posts) {
      return res.status(404).json({ msg: 'There is no post under this ID' });
    }

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/bycategory/:category
// @desc    Get posts by category
// @access  Public

router.get('/bycategory/:category', async (req, res) => {
  try {
    // invalid category
    if (!categories.indexOf(req.params.category) < 0) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    const posts = await Post.find();
    const postsfound = await posts.filter((post) =>
      post.categories.includes(req.params.category)
    );

    res.json(postsfound);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/byuser/:id
// @desc    Get posts by user
// @access  Public
router.get('/byuser/:id', async (req, res) => {
  try {
    const posts = await Post.find();
    const postsfound = await posts.filter((post) => post.user == req.params.id);

    if (!postsfound) {
      return res.status(404).json({ msg: 'No posts under this user' });
    }
    res.status(200).json(postsfound);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/byuser/:id
// @desc    Edit a post
// @access  Private

router.put(
  '/byuser/:id/:postId',
  [
    auth,
    check('text', 'Text is required').not().isEmpty(),
    check('title', 'title is required').not().isEmpty(),
    check('imageUrl', 'image is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User is no authorized' });
      }
      const { categories, text, title, imageUrl, lat, lng } = req.body;
      if (categories) post.categories = categories;
      if (text) post.text = text;
      if (title) post.title = title;
      if (imageUrl) post.imageUrl = imageUrl;
      if (lat) post.lat = lat;
      if (lng) post.lng = lng;
      post.date = Date.now();
      await post.save();

      res.status(200).json(post);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Post not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User is not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const profile = await Profile.findOne({ user: req.user.id });

    // check if the post has already been liked by the user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    profile.myLikes.unshift({ post: req.params.id });
    await post.save();
    await profile.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/unlike/:id
// @desc    Like a post
// @access  Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const profile = await Profile.findOne({ user: req.user.id });

    // check if the post has already been liked by the user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not been liked yet' });
    }
    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    // Get remove index2
    const removeIndex1 = profile.myLikes
      .map((myLike) => myLike.post.toString())
      .indexOf(req.params.id);

    post.likes.splice(removeIndex, 1);
    profile.myLikes.splice(removeIndex1, 1);

    await post.save();
    await profile.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post(
  '/comment/:id',
  [auth, check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // we are logged in so we have the id of the user
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);
    try {
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment
// @access  Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out the comment from the post
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
