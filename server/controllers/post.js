import async_handler from '../middleware/async_handler.js';
import Post from '../models/post.js';

const posts = async_handler(async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

const post = async_handler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

const create_post = async_handler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Field cannot be empty');
  }
  const post = await Post.create({
    user: req.user._id,
    text: req.body.text,
  });
  res.status(200).json(post);
});

const edit_post = async_handler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Field cannot be empty');
  }
  const post = await Post.findById(req.params.id);
  if (post) {
    post.text = req.body.text;
    await post.save();
    res.status(201).json(post);
  } else {
    res.status(401);
    throw new Error('Post not found');
  }
});

const delete_post = async_handler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await Post.findByIdAndDelete(req.params.id);
    res.json('Post deleted successfully');
  } else {
    throw new Error('Post not found');
  }
});

const like = async_handler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter(
        (id) => id.toString() != req.user._id.toString()
      );
    } else {
      post.likes.push(req.user._id);
    }
    await post.save();
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

export { posts, post, create_post, edit_post, delete_post, like };
