const ClothingItem = require("../models/clothingItem");
const {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} = require("../utils/errors");

// Get all clothing items
const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.json(items))
    .catch(next);
};

// Get single item
const getItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail(() => {
      throw new NotFoundError("Clothing item not found");
    })
    .then((item) => res.json(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid ID format"));
      }
      return next(err);
    });
};

// Create a new clothing item
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).json(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Validation failed"));
      }
      return next(err);
    });
};

// Delete clothing item
const deleteItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail(() => {
      throw new NotFoundError("Clothing item not found");
    })
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError("You do not have permission to delete this item");
      }
      return ClothingItem.findByIdAndDelete(req.params.itemId);
    })
    .then((item) => res.json(item))
    .catch(next);
};

// Like a clothing item
const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Clothing item not found");
    })
    .then((item) => res.json(item))
    .catch(next);
};

// Dislike a clothing item
const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Clothing item not found");
    })
    .then((item) => res.json(item))
    .catch(next);
};

module.exports = {
  getItems,
  getItem,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
