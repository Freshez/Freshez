const mongoose = require('mongoose');

const CustomerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  favoriteposts: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model(
  'customerprofile',
  CustomerProfileSchema
);
