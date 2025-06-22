import express from 'express';
import { login, logout, refereshJWTToken } from './auth.controller.js';
import wrapper from '../shared/wrapper.js';

const router = express.Router();

router.post('/auth/login', wrapper(login));

router.use(validateToken);
router.post('/auth/logout', wrapper(logout));
router.post('/auth/referesh', wrapper(refereshJWTToken));

export default router;