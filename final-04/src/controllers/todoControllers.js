import { readFile, writeFile } from "node:fs/promises";

export async function getTodos(_req, res) {
  const todosData = await readFile("./data.json", "utf-8");
  const todos = JSON.parse(todosData);

  // console.log(todos);

  return res.status(200).json(todos);
}

export async function getTodoById(req, res) {
  const todosData = await readFile("./data.json", "utf-8");
  const todos = JSON.parse(todosData);

  const todoId = req.params.todosId;

  const todo = todos.find((todo) => todo.id === Number(todoId));

  if (todo) {
    return res.status(200).json(todo);
  }
  return res.status(404).send(`404 NOT FOUND`);
}

export async function deleteTodoById(req, res) {
  const todosData = await readFile("./data.json", "utf-8");
  const todos = JSON.parse(todosData);

  const todoId = Number(req.params.id);

  const filteredTodos = todos.filter((todo) => todo.id !== Number(todoId));
  await writeFile("./data.json", JSON.stringify(filteredTodos), "utf8");
  return res.status(200).json({
    message: "Todo deleted successfully",
  });
}

export async function createTodo(req, res) {
  const todosData = await readFile("./data.json", "utf-8");
  const todos = JSON.parse(todosData);

  const newTodo = req.body;

  const updatedTodos = [...todos, newTodo];
  await writeFile("./data.json", JSON.stringify(updatedTodos), "utf8");
  res.status(201).json({ message: "Todo added successfully", todo: newTodo });
}

export async function updateTodo(req, res) {
  const todosData = await readFile("./data.json", "utf-8");
  const todos = JSON.parse(todosData);
  const todoId = Number(req.params.id);

  const updateTodo = req.body;

  const updateTodos = todos.map((todo) => {
    return todo.id === todoId ? { ...todo, ...updateTodo } : todo;
  });
  await writeFile("./data.json", JSON.stringify(updateTodos));
  return res.status(200).json({
    message: "Todo update successfully",
  });
}
