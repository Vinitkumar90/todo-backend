const express = require("express");
const router = express.Router();
const{
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
} = require("../controller/todoController")

const { validateTodo} = require("../middleware/validation");
const auth = require("../middleware/auth");

router.use(auth);

router.get("/all",getTodos);
router.post("/create",createTodo);
router.put("/update/:id",updateTodo);
router.delete("/delete/:id",deleteTodo);
router.patch("/toggle/:id", toggleTodo);

module.exports = router;

