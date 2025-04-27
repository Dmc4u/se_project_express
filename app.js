require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimiter = require("./middlewares/rateLimiter"); // ✅ NEW
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const auth = require("./middlewares/auth");
const { login, createUser } = require("./controllers/users");
const { getItems } = require("./controllers/clothingItems");

// ✅ Import your validation middlewares
const {
  validateLogin,
  validateUserBody,
  logValidationErrors,
} = require("./middlewares/validation");

const app = express();
const { PORT = 3001, MONGO_URL = "mongodb://127.0.0.1:27017/wtwr_db" } = process.env;

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("MongoDB connection error:", err));

mongoose.connection.on("error", (err) =>
  console.error("MongoDB connection lost:", err)
);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());       // ✅ Set security headers
app.use(rateLimiter);    // ✅ Limit incoming requests
app.use(requestLogger);

// ❗ Crash test route (before routes)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// Public routes
app.post("/signin", validateLogin, login);
app.post("/signup", validateUserBody, createUser);
app.get("/items", getItems);

// Protected routes (after auth)
app.use(auth);
app.use("/", mainRouter);

// Error Handling
app.use(errorLogger);
app.use(logValidationErrors); // Logs celebrate validation errors
app.use(errors());            // Celebrate errors handler
app.use(errorHandler);         // Centralized error handler

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
