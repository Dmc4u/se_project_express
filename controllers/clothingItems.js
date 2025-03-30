const ClothingItem = require("../models/clothingItem");

const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(next);
};

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id; // Assume user ID is available in `req.user`

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch(next);
};

const deleteClothingItem = (req, res, next) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .orFail(() => {
      const error = new Error("Clothing item not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.status(200).send(item))
    .catch(next);
};

module.exports = { getClothingItems, createClothingItem, deleteClothingItem };
