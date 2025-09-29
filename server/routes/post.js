import express from 'express';
import {
  posts,
  post,
  create_post,
  delete_post,
  like,
} from '../controllers/post.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, posts);
router.route('/:id').get(auth, post).delete(auth, delete_post);
router.post('/new', auth, create_post);
router.post('/:id/like', auth, like);

export default router;
