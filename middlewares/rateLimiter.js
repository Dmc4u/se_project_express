const rateLimit = require('express-rate-limit');

// 100 requests per 15 minutes per IP (you can adjust if needed)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,  // Disable old headers
});

module.exports = limiter;
