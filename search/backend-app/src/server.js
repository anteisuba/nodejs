import app from "./app.js";

console.log("① server.js imported app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`✅ Server listening on http://localhost:${port}`);
});
