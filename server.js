const express = require("express");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const knex = require("knex")(require("./knexfile"));
const app = express();
const productsRoutes = require("./routes/productRoutes");

app.use(express.json());
app.use(express.static("public"));
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use("/product", productsRoutes);

// app.get("/", async (_req, res) => {
//   res.json({ message: "hello" });
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
