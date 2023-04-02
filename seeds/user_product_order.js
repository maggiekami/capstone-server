const knex = require("knex");

const userData = require("../seed_data/user");
const orderData = require("../seed_data/order");
const productData = require("../seed_data/product");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  await knex("user").del();
  await knex("user").insert(userData);
  await knex("order").del();
  await knex("order").insert(orderData);
  await knex("product").del();
  await knex("product").insert(productData);
};
