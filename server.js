const express = require("express");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const knex = require("knex")(require("./knexfile"));
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const productsRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(express.json());
app.use(express.static("public"));
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use("/product", productsRoutes);
app.use("/auth", userRoutes);
app.use("/order", orderRoutes);
app.use("/create-checkout-session", checkoutRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
