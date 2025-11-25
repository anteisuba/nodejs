import { readFile } from 'mode:fs/promises';
const initializeTodosString =await readFile("./data/initData.json", "utf-8");


console.log(initializeTodosString);