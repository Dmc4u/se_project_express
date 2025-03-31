const handleErrors = (err, req, res,) => {
  console.error(err); // Log the error

  if (err.name === "ValidationError") {
    return res.status(400).send({ message: "Invalid data" });
  }
  if (err.name === "CastError") {
    return res.status(400).send({ message: "Invalid ID format" });
  }
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(500).send({ message: "Server error" });
};

module.exports = handleErrors;