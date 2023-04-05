const knex = require("knex")(require("../knexfile"));
const express = require("express");
const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const data = await knex("product");
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Could not fetch products from database: ${error.message}`,
    });
  }
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const data = await knex("product").where({ id: productId });

    if (!data.length) {
      return res.status(404).json({
        error: true,
        message: `Could not find product with ID: ${productId}`,
      });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Could not fetch product for ${productId}`,
    });
  }
});

module.exports = router;
