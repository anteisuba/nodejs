import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { json } from "node:stream/consumers";
const server = createServer(async (request, response) => {
  // response text
  // response.writeHead(200, { "Content-Type": "text/plain" });
  // response.end("Hello World!\n");
  if (request.url === "/") {
    //设置内容的类型 Response HTML
    response.writeHead(200, { "Content-Type": "text/html " });
    const htmlFile = await readFile("./index.html", "utf-8");
    response.end(htmlFile);
  }

  if (request.url === "/data") {
    //response json
    response.writeHead(200, { "content-type": "application/json" });
    const jsonFile = await readFile("./text.json", "utf8");
    response.end(jsonFile);
  }
});

// Port,hostname(IP地址)
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
