const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Product = require('../../models/Product');
const Profile = require('../../models/VendorProfile');
const User = require('../../models/User');

// @route   Post api/products
// @desc    Create a product
// @access  Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      // Check user role
      if (user.role.toString() !== 'Vendor') {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      const newProduct = new Product({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const product = await newProduct.save();

      res.json(product);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/products
// @desc    Get all products
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 });
    res.json(products);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(product);
  } catch (err) {
    console.log(err.message);

    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Check user
    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await product.remove();
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.log(err.message);

    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route   PUT api/products/like/:id
// @desc    Like a product
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check if post has already been liked by user
    if (
      product.likes.filter((like) => like.user.toString() == req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Product already liked' });
    }

    product.likes.unshift({ user: req.user.id });

    await product.save();

    res.json(product.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/products/like/:id
// @desc    Unlike a product
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check if post has already been liked by user
    if (
      product.likes.filter((like) => like.user.toString() == req.user.id)
        .length == 0
    ) {
      return res.status(400).json({ msg: 'Product has not yet been liked' });
    }

    // Get remove index
    const removeIndex = product.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    product.likes.splice(removeIndex, 1);

    await product.save();

    res.json(product.likes);
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
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

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
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Pull out comment
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

    res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
