const mongoose = require('mongoose');

const VendorProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  products: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'users',
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
      likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
          },
        },
      ],
      reviews: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
          },
          text: {
            type: String,
            required: true,
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
    },
  ],
  posts: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'users',
      },
      header: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
          },
        },
      ],
      comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
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
    },
  ],
  favoriteposts: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'users',
      },
      header: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
          },
        },
      ],
      comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
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
    },
  ],
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
