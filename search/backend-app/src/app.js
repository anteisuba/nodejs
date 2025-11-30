import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import todoRouter from './routes/todoRoute.js';
import { pinoHttpMiddleware } from './utils/loggerHelper.js';


const limiter = rateLimit({
	windowMs: 1000, // 1 second
	limit: 10, 
	standardHeaders: 'draft-8', 
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(pinoHttpMiddleware);
app.use('/v1', todoRouter);

export default app;
