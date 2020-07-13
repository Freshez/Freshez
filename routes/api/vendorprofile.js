const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/VendorProfile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   GET api/vendorprofile/me
// @desc    Get current users vendor profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    profile.populate('user', ['name', 'avatar']);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/vendorprofile
// @desc    Create or update a user vendor profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('company', 'Company is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      products,
      posts,
      favoriteposts,
      company,
      website,
      location,
      role,
      bio,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    /*
    if (products) {
      profileFields.products = products
        .split(',')
        .map((products) => products.trim());
    }
    if (posts) {
      profileFields.posts = posts.split(',').map((posts) => posts.trim());
    }
    if (favoriteposts) {
      profileFields.favoriteposts = favoriteposts
        .split(',')
        .map((favoriteposts) => favoriteposts.trim());
    }
    */
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (role) profileFields.role = role;
    if (bio) profileFields.bio = bio;

    // Build social object
    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.youtube = facebook;
    if (linkedin) profileFields.social.youtube = linkedin;
    if (instagram) profileFields.social.youtube = instagram;

    /* TODO add posts, favoriteposts, and products objects
    profileFields.posts = {};
    profileFields.favoriteposts = {};
    profileFields.products = {};

    console.log(profileFields.products);
    console.log(profileFields.posts);
    console.log(profileFields.favoriteposts);
    */

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(500).send('Server Error');
    }
  }
);

// @route   GET api/vendorprofile
// @desc    Get all vendor profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/vendorprofile/user/:user_id
// @desc    Get vendor profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/vendorprofile
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove users posts
    await Post.deleteMany({ user: req.user.id });

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/vendorprofile/user/:user_id/posts
// @desc    Get vendor profile posts by user id
// @access  Private
router.get('/user/:user_id/posts', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profile.posts);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/vendorprofile/posts
// @desc    Add post to vendor profile
// @access  Private
router.put(
  '/posts',
  [
    auth,
    [
      check('header', 'Header is required').not().isEmpty(),
      check('name', 'Name is required').not().isEmpty(),
      check('text', 'Text is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const vendorprofile = await Profile.findOne({ user: req.user.id });

      const newPost = new Post({
        header: req.body.header,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      vendorprofile.posts.unshift(post);

      await vendorprofile.save();

      res.json(vendorprofile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/vendorprofile/posts/:post_id
// @desc    Delete post from vendor profile
// @access  Private
router.delete('/posts/:post_id', auth, async (req, res) => {
  try {
    const vendorprofile = await Profile.findOne({ user: req.user.id });
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    const removeIndex = vendorprofile.posts
      .map(function (e) {
        return e._id.toString();
      })
      .indexOf(post._id.toString());

    vendorprofile.posts.splice(removeIndex, 1);

    await vendorprofile.save();

    await post.remove();

    res.json(vendorprofile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/vendorprofile/favoriteposts
// @desc    Add favorite post to vendor profile
// @access  Private

// @route   PUT api/vendorprofile/products
// @desc    Add product to vendor profile
// @access  Private
module.exports = router;
