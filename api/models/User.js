const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  // following
  following: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      name: String,
      avatar: String,
    },
  ],
});

let User;
module.exports = User = mongoose.model('user', UserSchema);
