import express from 'express';
import auth from '../middleware/auth.js';
import {
  login,
  register,
  update_profile,
  get_profile,
} from '../controllers/user.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.route('/profile').get(auth, get_profile).put(auth, update_profile);

export default router;
