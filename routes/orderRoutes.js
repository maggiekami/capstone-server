const knex = require("knex")(require("../knexfile"));
const express = require("express");
const app = express();
const router = express.Router();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  try {
    const newOrderDetails = await knex("order").insert({
      address: req.body.address,
      fName: req.body.fName,
      lName: req.body.lName,
      total: req.body.total,
    });

    const newOrder = await knex("order").where({
      id: newOrderDetails[0],
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({
      error: true,
      mesesage: `Could not create new order record`,
    });
  }
});

module.exports = router;
