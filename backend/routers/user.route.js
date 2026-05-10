import express from 'express';
import { deleteUser, editUser, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { validateEditUser } from '../middlewares/Validation.js';

const router = express.Router();

router.get('/', verifyToken, getUser);

router.patch('/', verifyToken, validateEditUser, editUser);

router.delete('/', verifyToken, deleteUser);

export default router;