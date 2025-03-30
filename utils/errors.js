const handleErrors = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).send({ message: "Invalid data" });
  }
  if (err.name === "CastError") {
    return res.status(400).send({ message: "Invalid ID format" });
  }
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  res.status(500).send({ message: "Server error" });
};

module.exports = handleErrors;
