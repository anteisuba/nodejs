import express from "express";
import cors from "cors";

import { readFile, writeFile } from "node:fs/promises";
import { write } from "node:fs";

const app = express();
app.use(cors());

const port = 3000;

app.get("/todos", async (_req, res) => {
  const todosData = await readFile("./data.json", "utf-8");
  const todos = JSON.parse(todosData);

  return res.status(200).json(todos);
});

app.get("/todos/:todosId", async (req, res) => {
  const todosData = await readFile("./data.json", "utf-8");
  const todos = JSON.parse(todosData);

  const todoId = req.params.todosId;

  const todo = todos.find((todo) => todo.id === Number(todoId));

  if (todo) {
    return res.status(200).json(todo);
  }
  return res.status(404).send(`404 NOT FOUND`);
});

app.get("/todos/delete/:todosId", async (req, res) => {
  const todosData = await readFile("./data.json", "utf-8");
  const todos = JSON.parse(todosData);

  const todoId = req.params.todosId;

  const filteredTodos = todos.filter((todo) => todo.id !== Number(todoId));
  await writeFile("./data.json", JSON.stringify(filteredTodos), "utf8");
  return res.status(200).json({
    message: "Todo deleted successfully",
  });
});

app.get("/todos/add/:addtodo", async (req, res) => {
  const todosData = await readFile("./data.json", "utf-8");
  const todos = JSON.parse(todosData);

  const addtodoId = req.params.addtodo;
  const parsedAddTodo = JSON.parse(addtodoId);
  const updatedTodos = [...todos, parsedAddTodo];
  await writeFile("./data.json", JSON.stringify(updatedTodos), "utf8");
  return res.status(200).json({
    message: "Todo added successfully",
  });
});

app.get("/todos/update/:updatetodo", async (req, res) => {
  const todosData = await readFile("./data.json", "utf-8");
  const todos = JSON.parse(todosData);

  const updatetodoId = req.params.updatetodo;
  const parsedUpdateTodo = JSON.parse(updatetodoId);

  const updateTodos = todos.map((todo) => {
    if (todo.id === parsedUpdateTodo.id) {
      return {
        ...todo,
        ...parsedUpdateTodo,
      };
    }
    return todo;
  });
  await writeFile("./data.json", JSON.stringify(updateTodos), "utf8");
  return res.status(200).json({
    message: "Todo update successfully",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
