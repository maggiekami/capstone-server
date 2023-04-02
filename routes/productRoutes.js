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

module.exports = router;
