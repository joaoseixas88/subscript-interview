exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id").primary();
      table.string("email").notNullable().unique();
    })
    .createTable("todo_users", function (table) {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table
        .integer("todo_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("todos")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("todo_users").dropTableIfExists("users");
};
