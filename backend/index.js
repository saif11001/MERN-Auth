import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import { connectDB } from './db/connectDB.js';
import authRouter from './routers/auth.route.js';
import userRouter from './routers/user.route.js';
import adminRouter from './routers/admin.route.js';
import { generalLimiter } from './middlewares/rateLimiter.js';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLINT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(generalLimiter);

app.use('/api/v1/auth/', authRouter);
app.use('/api/v1/admin/', adminRouter);
app.use('/api/v1/user/', userRouter);

connectDB();

export default app;