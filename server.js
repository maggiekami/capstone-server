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
const orderRoutes = require("./routes/orderRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");

// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cors());

app.use(express.json());
app.use(express.static("public"));

app.use("/product", productsRoutes);
app.use("/auth", userRoutes);
app.use("/order", orderRoutes);
app.use("/create-checkout-session", checkoutRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
