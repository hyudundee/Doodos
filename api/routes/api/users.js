const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User'); // get user model/schema

// @route   POST api/users
// @desc    Register route
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200', // default size
        r: 'pg', // rating
        d: 'mm', // generate a default user icon
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // return jsonwebtoken, let user login instantly after they registered
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// add following
// @route   POST api/users/:id/:followingId
// @desc    Register route
// @access  Private

router.post('/following/:followingId', auth, async (req, res) => {
  try {
    const followinguser = await User.findById(req.params.followingId).select(
      '-password'
    );
    const user = await User.findById(req.user.id).select('-password');

    if (req.params.followingId === req.user.id.toString()) {
      return res
        .status(400)
        .json({ msg: 'Cannot Add yourself as a following' });
    }
    if (!followinguser) {
      return res.status(404).json({ msg: 'Following user does not exist' });
    }

    const newFollowing = {
      user: followinguser,
      name: followinguser.name,
      avatar: followinguser.avatar,
    };

    let alreadyInFollowing = user.following
      .map((f) => f.user)
      .indexOf(req.params.followingId);

    if (alreadyInFollowing > -1) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already in following' }] });
    }

    user.following.unshift(newFollowing);

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Please use a valid followingId' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/:id/
// @desc    Get user by ID
// @access  Public

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res(404).json({ msg: 'No user under this ID' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'User id is invalid' });
    }
    res.status(500).send('Server Error');
  }
});

// remove following
// @route   DELETE api/users/:id/:followingId
// @desc    Register route
// @access  Private

router.delete('/following/:followingId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const removeIndex = user.following
      .map((f) => f.user)
      .indexOf(req.params.followingId);

    if (user.following.length === 0) {
      return res
        .status(400)
        .json({ msg: 'Cannot remove from empty following list' });
    }

    if (removeIndex === -1) {
      return res
        .status(400)
        .json({ msg: 'Cannot remove a user whom you have not followed yet' });
    }

    user.following.splice(removeIndex, 1);
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).send('Please use a valid followingId');
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
