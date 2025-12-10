import {
  getAllTodos,
  getTodoById as getTodoByIdApi,
  deleteTodoById as deleteTodoByIdApi,
  createTodo as createTodoApi,
  updateTodo as updateTodoApi,
  countTodo as countTodoApi,
} from "../services/todoService.js";
import Apperror from "../utils/Apperror.js";

export async function getTodos(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";

  const offset = (page - 1) * limit;

  const todos = await getAllTodos(offset, limit, search);

  const total = await countTodoApi(search); // ✅ 加上这行
  next();
  return res.status(200).json({
    page: Number(page),
    limit: Number(limit),
    total,
    todos,
  });
}

export async function getTodoById(req, res) {
  //if the todoid is missing,the request will be process by getTodos
  // if (!req.params.todoId) {
  //   return res.status(400).send("todoId is required");
  // }

  const todo = await getTodoByIdApi(req.params.todoId);

  if (todo) {
    return res.status(200).json({ message: "Todo found", data: todo });
  }

  return res.status(404).json({ message: "404 Not Found" });
}

export async function deleteTodoById(req, res) {
  const todoId = req.params.todoId;

  if (!todoId) {
    throw new Apperror(`the todoid is required`, 400, "bad request");
  }

  const deletedTodoNumber = await deleteTodoByIdApi(todoId);
  if (!deletedTodoNumber) {
    res.status(404).json({ message: "Todo not found" });
  }
  return res.status(200).json({
    message: "Todo deleted successfully",
    data: deletedTodoNumber,
  });
}

export async function createTodo(req, res) {
  const addTodo = req.body;

  if (!addTodo) {
    throw new Apperror("The id ${addTodo.id} already exists", 400, error.name);
  }

  try {
    const addedTodo = await createTodoApi(addTodo);
    return res.status(200).json({
      message: "Todo added successfully",
      data: addedTodo,
    });
  } catch (error) {
    console.log("error from controller =", error);
    throw new Apperror("The id ${addTodo.id} already exists", 400, error.name);
  }
}

export async function updateTodo(req, res) {
  const updateTodo = req.body;

  const updatedTodoEffect = await updateTodoApi(updateTodo);
  if (!updatedTodoEffect) {
    res.status(404).json({ message: "Todo not found" });
  }

  return res.status(200).json({
    message: "Todo updated successfully",
    data: updatedTodoEffect,
  });
}

export async function countTodo(req, res) {
  const search = req.query.search || "";
  console.log("req.query =", req.query);
  console.log("req.params =", req.params);
  console.log("req.search =", req.search);
  const todoCount = await countTodoApi(search);

  return res.status(200).json({
    search: search,
    data: todoCount,
  });
}
