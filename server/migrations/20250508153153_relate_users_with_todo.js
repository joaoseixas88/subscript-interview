exports.up = function (knex) {
  return knex.schema.table("todos", function (table) {
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
    table.boolean("private").defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table("todos", function (table) {
    table.dropColumn("user_id");
    table.dropColumn("private");
  });
};
