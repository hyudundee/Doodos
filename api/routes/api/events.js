const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Event = require('../../models/Event');
const User = require('../../models/User');
const Product = require('../../models/Product');

// @route   POST api/events/:eventid
// @desc    register event by ID
// @access  Public
router.post('/registration/:id', auth, async (req, res) => {
  const event = await Event.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (!event) {
    return res.status(404).json({ msg: 'No event under this ID' });
  }

  const registration = {
    user: req.user.id,
    name: user.name,
    avatar: user.avatar,
  };

  if (event.positionremains > 0) {
    event.registered.unshift(registration);
    event.positionremains -= 1;
    console.log(registration);
  } else {
    return res.status(400).json({ msg: 'No available place for this event' });
  }

  await event.save();
  res.json(event);
});

// @route   DELETE api/events/:eventid
// @desc    Cancel event registration by ID
// @access  Public
router.delete('/registration/:id', auth, async (req, res) => {
  const event = await Event.findById(req.params.id);

  // check if event id is valid
  if (!event) {
    return res.status(404).json({ msg: 'No event for this ID' });
  }

  // get remove index
  const removeIndex = event.registered
    .map((registrition) => registrition.user.toString())
    .indexOf(req.user.id);
  console.log(removeIndex);
  // check if registered
  if (removeIndex === -1) {
    return res.status(400).json({ msg: 'Have not registered this event' });
  }
  event.registered.splice(removeIndex, 1);
  event.positionremains += 1;

  await event.save();
  res.json(event);
});

// @route   GET api/events
// @desc    Get all events
// @access  Public

router.get('/', async (req, res) => {
  try {
    const event = await Event.find().sort({ date: -1 });
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/events/:id
// @desc    Get event by ID
// @access  Public

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'There is no event under this ID' });
    }
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/events/ticket/:id
// @desc    Get event ticket by ID
// @access  Public

router.get('/:id/:ticketId', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const ticket = await Product.findById(req.params.ticketId);
    if (!event) {
      return res.status(404).json({ msg: 'Requested event does not exist' });
    }
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
