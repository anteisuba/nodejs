import express from "express";
import { readFile, writeFile } from "node:fs/promises";

const app = express();
const port = 3000;

app.get("/:idolName", async (req, res) => {
  //   res.writeHead(200, { "Content-Type": "text/html" });
  //   const htmlFile = await readFile("./index.html", "utf8");
  //   res.end(htmlFile);
  const idolName = req.params.idolName;

  const idolDataText = await readFile("./data.json", "utf8");
  const idolData = JSON.parse(idolDataText);

  const resultIdol = idolData.find(
    (idol) => idol.name.toLowerCase() === idolName.toLowerCase()
  );

  if (!resultIdol) {
    return res.status(404).send("404 not find");
  }

  return res.status(200).json(resultIdol);
});

app.listen(port, () => {
  //local ip address 127.0.0.1
  console.log(`Example app listening on port 127.0.0.1.${port}`);
});
