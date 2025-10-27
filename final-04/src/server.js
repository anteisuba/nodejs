import app from "./app.js";

const port = process.env.port;

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
