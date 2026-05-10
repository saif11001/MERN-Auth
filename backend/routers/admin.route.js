import express from 'express';
import { deleteAllUser, deleteUser, getAllUsers, getUser } from '../controllers/admin.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.js';

const router = express.Router();

router.get('/users', verifyToken, verifyAdmin, getAllUsers);

router.get('/user/:userId', verifyToken, verifyAdmin, getUser);

router.delete('/user/:userId', verifyToken, verifyAdmin, deleteUser);

router.delete('/users', verifyToken, verifyAdmin, deleteAllUser);

export default router;