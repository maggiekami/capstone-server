const knex = require("knex")(require("../knexfile"));
const express = require("express");
const router = express.Router();

router.post("/order", async (req, res) => {
  //   add validation

  try {
    const newOrderDetails = await knex("order").insert({
      address: req.body.address,
      fName: req.body.fName,
      lName: req.body.lName,
      total: req.body.total,
    });

    const newWarehouse = await knex("order").where({
      id: newOrderDetails[0],
    });

    res.status(201).json(newWarehouse);
  } catch (error) {
    res.status(500).json({
      error: true,
      mesesage: `Could not create new order record`,
    });
  }
});
