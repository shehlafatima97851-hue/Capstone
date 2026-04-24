import rateLimit from 'express-rate-limit';

const apiRateLimiter = rateLimit({
  windowMs: 30 * 1000,
  max: 15,
  message: {
    error: 'Too many requests. Please wait a few seconds before sending another question.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

export default apiRateLimiter;
