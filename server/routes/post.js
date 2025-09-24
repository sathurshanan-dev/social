import express from 'express';
import { posts, create_post } from '../controllers/post.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', posts);
router.post('/new', auth, create_post);

export default router;
