import express from 'express';
import { signup, verifyEmail, login, logout, forgetPassword, resetPassword, checkAuth } from '../controllers/auth.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js';
import { authLimiter, sensitiveLimiter } from '../middlewares/rateLimiter.js';
import { validateForgetPassword, validateLogin, validateResetPassword, validateSignup, validateVerifyEmail } from '../middlewares/Validation.js';

const router = express.Router();

router.get('/check-auth', verifyToken, checkAuth);

router.post('/signup', authLimiter, validateSignup, signup);

router.post('/verify-email', sensitiveLimiter, validateVerifyEmail, verifyEmail);

router.post('/login', authLimiter, validateLogin, login);

router.post('/logout', logout);

router.post('/forget-password', authLimiter, validateForgetPassword,  forgetPassword);

router.post('/reset-password/:token', sensitiveLimiter, validateResetPassword, resetPassword);

export default router;