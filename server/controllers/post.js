import async_handler from '../middleware/async_handler.js';
import Post from '../models/post.js';

const posts = async_handler(async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

const create_post = async_handler(async (req, res) => {
  console.log(req.body);

  const post = await Post.create({
    user: req.user._id,
    text: req.body.text,
  });
  res.status(201).json(post);
});

export { posts, create_post };
