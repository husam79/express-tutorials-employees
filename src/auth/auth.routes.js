import express from 'express';
import { login, logout } from './auth.controller.js';
import wrapper from '../shared/wrapper.js';

const router = express.Router();

router.post('/auth/login', wrapper(login));
router.post('/auth/logout', wrapper(logout));

export default router;