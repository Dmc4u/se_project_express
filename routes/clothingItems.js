const router = require("express").Router();
const {
  getItems,
  getItem,
  createItem,
  updateItem,
   deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.get("/:itemId", getItem);
router.post("/", createItem);
router.put("/:itemId", updateItem);
 router.delete("/:itemId", deleteItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
