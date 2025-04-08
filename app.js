const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors package
const mainRouter = require("./routes/index");
const { BAD_REQUEST, DEFAULT } = require("./utils/errors");
const auth = require('./middlewares/auth'); // Import the auth middleware

const app = express();
const { PORT = 3001 } = process.env;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("MongoDB connection error:", err));

mongoose.connection.on("error", (err) =>
  console.error("MongoDB connection lost:", err)
);

app.use(express.json());
app.use(cors()); // Enable CORS

// Routes that do not require authorization
app.post('/signin', require('./controllers/users').login);
app.post('/signup', require('./controllers/users').createUser);
app.get('/items', require('./controllers/clothingItems').getItems);

// Authorization middleware for all other routes
app.use(auth);

app.use("/", mainRouter);

// Centralized error handling middleware
/* eslint-disable-next-line no-unused-vars */
app.use((err, req, res, next) => { // `next` re-added but safely ignored by ESLint
  console.error(err);

  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
  }
  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST).json({
      message: "Validation failed",
      details: err.errors,
    });
  }
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(DEFAULT).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});