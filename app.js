const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { createNotFoundError, createBadRequestError, createUnauthorizedError, errorHandler, formatError } = require("./utils/errors"); // Import the error handler

const app = express();
const { PORT = 3001 } = process.env;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

mongoose.connection.on("error", (err) =>
  console.error("MongoDB connection lost:", err)
);

app.use(express.json());

// Temporary authorization middleware
app.use((req, res, next) => {
  req.user = { _id: "67ea979672b7caf11a0392f3" }; // Fake user ID
  next();
});

app.use("/", mainRouter);

   // Error handling middleware
   app.use((err, req, res, next) => {
    if (err.name === "CastError") {
      res.status(400).json({ message: "Invalid ID format" });
    } else if (err.name === "ValidationError") {
      res.status(400).json({ message: "Validation failed", details: err.errors });
    } else if (err.statusCode) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
    next();
  });



// Error handling middleware
app.use(createNotFoundError, createBadRequestError, createUnauthorizedError, formatError,  errorHandler); // Ensure this is after all routes

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
