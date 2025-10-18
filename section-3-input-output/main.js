import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const readline = createInterface({
  input: stdin,
  output: stdout,
});

const name = await readline.question("What's your name?\n");
const age = await readline.question("How old are you\n");

const birthYear = new Date().getFullYear() - age;

const answer = await readline.question(
  `Welcome ${name},you are:${birthYear},right?(y/n)\n`
);
if (answer[0].toUpperCase() != "Y") {
  console.log(`I konw,you were born at ${birthYear - 1}!`);
}
readline.close();
