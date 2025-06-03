const express = require("express");
const router = express.Router();
const entityUserController = require("../controllers/entityUserController");

router.get("/", entityUserController.index);
router.get("/:id", entityUserController.find);
router.post("/", entityUserController.create);
router.put("/:id", entityUserController.update);
router.delete("/:id", entityUserController.delete);

module.exports = router;
