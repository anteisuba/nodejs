import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 1000, // 1 秒
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

export default rateLimiter;
