const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  flatNumber: {
    type: String,
  },
  street: {
    type: String,
  },
  postCode: {
    type: String,
  },
  City: {
    type: String,
  },
  state: {
    type: String,
  },
  host: {
    type: String,
    required: true,
  },
  registered: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      name: String,
      avatar: String,
    },
  ],
  totalregistration: {
    type: Number,
    default: 0,
  },
  positionremains: {
    type: Number,
    required: true,
  },
  from: {
    type: Date,
  },
  to: {
    type: Date,
  },
  modifiedOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
  /*
  ticketrequired: {
    type: Boolean,
    default: false,
    required: true,
  },
  */
  ticketPrice: {
    type: Number,
    required: true,
  },
  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'product',
  },
});

module.exports = Event = mongoose.model('event', EventSchema);
