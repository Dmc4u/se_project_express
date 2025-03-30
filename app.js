const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const handleError = require("./utils/errors");

const app = express();

const { PORT = 3001 } = process.env;

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
app.use("/", mainRouter);
app.use(handleError); // Error handling middleware

app.listen(PORT, () => {
  console.log("Listening on port ${PORT}");
});
