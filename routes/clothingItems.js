const router = require("express").Router();
const {
  getItem,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const {
  validateCardBody,
  validateId,
} = require("../middlewares/validation");

router.get("/:itemId", validateId, getItem);
router.post("/", validateCardBody, createItem);
router.delete("/:itemId", validateId, deleteItem);
router.put("/:itemId/likes", validateId, likeItem);
router.delete("/:itemId/likes", validateId, dislikeItem);

module.exports = router;