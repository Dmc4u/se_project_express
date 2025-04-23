const ClothingItem = require("../models/clothingItem");
const {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} = require("../utils/errors");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.json(items)) // ✅ 200 is implied
    .catch(next);
};

const getItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail(() => {
      throw new NotFoundError("Clothing item not found");
    })
    .then((item) => res.json(item)) // ✅ 200 is implied
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID format"));
      } else {
        next(err);
      }
    });
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).json(item)) // ✅ 201 for creation
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Validation failed"));
      } else {
        next(err);
      }
    });
};

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
    .then((item) => res.json(item)) // ✅ 200 is implied
    .catch(next);
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Clothing item not found");
    })
    .then((item) => res.json(item)) // ✅ 200 is implied
    .catch(next);
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Clothing item not found");
    })
    .then((item) => res.json(item)) // ✅ 200 is implied
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