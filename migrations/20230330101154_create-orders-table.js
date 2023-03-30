exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments("id").primary();
      table.string("email").notNullable().unique();
      table.string("fName").notNullable();
      table.string("lName").notNullable();
    })
    .createTable("product", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.float("price").notNullable();
      table.string("image").notNullable();
      table.text("description").notNullable();
    })
    .createTable("order", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("address").notNullable();
      table.string("fName").notNullable();
      table.string("lName").notNullable();
      table.decimal("total", 8, 2).notNullable();
      table.timestamps(true, true);
    })
    .createTable("product_order", (table) => {
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("product")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("order_id")
        .unsigned()
        .references("id")
        .inTable("order")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("product_order")
    .dropTable("order")
    .dropTable("product")
    .dropTable("user");
};
