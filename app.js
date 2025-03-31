const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

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
app.use((err, req, res,) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});