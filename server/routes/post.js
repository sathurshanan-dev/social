import express from 'express';
import { posts, post, create_post, like } from '../controllers/post.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, posts);
router.get('/:id', auth, post);
router.post('/new', auth, create_post);
router.post('/:id/like', auth, like);

export default router;
