import express from "express";
import {
  getTodoById,
  createTodo,
  deleteTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todoControllers.js";
const router = express.Router();
// list and create
router.route("/todos").get(getTodos).post(createTodo);

// operations on single todo (use consistent param name :id)
router
  .route("/todos/:id")
  .get(getTodoById)
  .put(updateTodo)
  .delete(deleteTodoById);
export default router;
