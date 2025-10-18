import express from "express";
import { readFile } from "node:fs/promises";
import cors from "cors";
const app = express();

app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
  res.end("This is main page");
});

app.get("/todos", async (_req, res) => {
  const todoData = await readFile("./data.json", "utf8");
  const todos = JSON.parse(todoData);
  return res.status(200).json(todos);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
