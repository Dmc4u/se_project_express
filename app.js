require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const auth = require("./middlewares/auth");
const rateLimiter = require("./middlewares/rateLimiter");
const { login, createUser } = require("./controllers/users");
const { getItems } = require("./controllers/clothingItems");
const {
  validateLogin,
  validateUserBody,
  logValidationErrors,
} = require("./middlewares/validation");

const app = express();
const { PORT = 3001, MONGO_URL = "mongodb://127.0.0.1:27017/wtwr_db" } = process.env;

// ✅ 1. Secure CORS setup
const allowedOrigins = [
  'https://mywears.crabdance.com',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // allow cookies if needed later
}));

// ✅ 2. Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("MongoDB connection error:", err));

mongoose.connection.on("error", (err) =>
  console.error("MongoDB connection lost:", err)
);

// ✅ 3. Middlewares
app.use(express.json());
app.use(helmet()); // Set security headers
app.use(rateLimiter); // Protect from DoS attacks
app.use(requestLogger);

// ✅ 4. Crash test route (for PM2 test)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// ✅ 5. Public routes (no auth)
app.post("/signin", validateLogin, login);
app.post("/signup", validateUserBody, createUser);
app.get("/items", getItems);

// ✅ 6. Authenticated routes
app.use(auth);
app.use("/", mainRouter);

// ✅ 7. Error handling middlewares
app.use(errorLogger);
app.use(logValidationErrors); // Log celebrate errors
app.use(errors());            // Handle celebrate errors
app.use(errorHandler);        // Handle all other errors

// ✅ 8. Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
