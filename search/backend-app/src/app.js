import express from "express";
import cors from "cors";

import todoRouter from "./routes/todoRoute.js";
import userRouter from "./routes/userRoute.js";
import { pinoHttpMiddleware } from "./utils/loggerHelper.js";
import globalErrorhandler from "./utils/globalErrorhandler.js";
import rateLimiter from "./utils/rateLimiter.js";
import verify from "jsonwebtoken";
import { verifyToken } from "./utils/jwtHelper.js";

const app = express();

app.use(cors());
app.use(express.json());
// ✅ 这里用已经创建好的 limiter 实例
app.use("/v1", rateLimiter);

app.use("/v1", userRouter);

app.use((req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const token = authorization.split(" ")[1];
  verifyToken(token);
  next();
});

// ✅ 业务路由
app.use("/v1", todoRouter);

// ✅ 全局错误处理放最后
app.use(globalErrorhandler);

export default app;
