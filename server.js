const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

// app.get("/", async (_req, res) => {
//   res.json({ message: "hello" });
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
