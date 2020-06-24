const mongoose = require('mongoose');

const VendorProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  favoriteposts: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  company: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Vendor',
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

module.exports = Profile = mongoose.model('vendorprofile', VendorProfileSchema);
