// import { readFile } from "node:fs/promises";
import { readFile as readFileSync } from "node:fs";

//文件读取
// const data = await readFile("./data.json", "utf8");
readFileSync("./data.json", "utf8", (error, data) => {
  if (error) {
    console.log(error.message);
  }
  console.log(data);
});

//await writeFile("./data.json", "yangjian", "utf8");

//写文件
// console.log(data);
