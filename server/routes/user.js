import express from 'express';
import auth from '../middleware/auth.js';
import { login, register, update_profile } from '../controllers/user.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile', auth, update_profile);

export default router;
