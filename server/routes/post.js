import express from 'express';
import auth from '../middleware/auth.js';
import {
  get_posts,
  get_post,
  create_post,
  edit_post,
  delete_post,
  like_post,
} from '../controllers/post.js';

const router = express.Router();

router.get('/', auth, get_posts);
router
  .route('/:id')
  .get(auth, get_post)
  .put(auth, edit_post)
  .delete(auth, delete_post);
router.post('/new', auth, create_post);
router.post('/:id/like', auth, like_post);

export default router;