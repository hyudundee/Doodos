const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },

  /*categories include:
    ideas
    artworks
    spotsAroundYou
    fashion
    advertisement
    activities
    events
    life
    */

  categories: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  // name of the user
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  lat: {
    type: Number,
    default: 0,
  },
  lng: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

let Post;
module.exports = Post = mongoose.model('post', PostSchema);
