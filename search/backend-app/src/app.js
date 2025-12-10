import express from "express";
import cors from "cors";

import todoRouter from "./routes/todoRoute.js";
import { pinoHttpMiddleware } from "./utils/loggerHelper.js";
import globalErrorhandler from "./utils/globalErrorhandler.js";
import rateLimiter from "./utils/rateLimiter.js";

const app = express();

app.use(cors());
app.use(express.json());
// ✅ 这里用已经创建好的 limiter 实例
app.use("/v1", rateLimiter);

// ✅ 业务路由
app.use("/v1", todoRouter);

// ✅ 全局错误处理放最后
app.use(globalErrorhandler);

export default app;
