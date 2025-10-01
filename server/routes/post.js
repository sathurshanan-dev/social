import express from 'express';
import auth from '../middleware/auth.js';
import {
  posts,
  post,
  create_post,
  edit_post,
  delete_post,
  like,
} from '../controllers/post.js';

const router = express.Router();

router.get('/', auth, posts);
router
  .route('/:id')
  .get(auth, post)
  .put(auth, edit_post)
  .delete(auth, delete_post);
router.post('/new', auth, create_post);
router.post('/:id/like', auth, like);

export default router;
