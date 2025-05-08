const knex = require("./connection.js");

async function all() {
  return knex("todos").whereNull("deleted_at");
}

async function get(id) {
  const results = await knex("todos").where({ id }).whereNull("deleted_at");
  return results[0];
}

async function create(title, order) {
  const results = await knex("todos").insert({ title, order }).returning("*");
  return results[0];
}

async function update(id, properties) {
  const results = await knex("todos")
    .where({ id })
    .whereNull("deleted_at")
    .update({ ...properties })
    .returning("*");
  return results[0];
}

async function del(id) {
  const results = await knex("todos")
    .where({ id })
    .whereNull("deleted_at")
    .update({ deleted_at: knex.fn.now() })
    .returning("*");
  return results[0];
}

async function clear() {
  return knex("todos").del().returning("*");
}

module.exports = {
  all,
  get,
  create,
  update,
  delete: del,
  clear,
};
