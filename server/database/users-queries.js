const knex = require("./connection.js");

async function create(email) {
  const [user] = await knex("users").insert({ email }).returning("*");
  return user;
}

async function getByEmail(email) {
  const [user] = await knex("users")
    .where({ email })
    .whereNull("deleted_at")
    .returning("*");
  return user;
}

async function getById(id) {
  const [user] = await knex("users")
    .where({ id })
    .whereNull("deleted_at")
    .returning("*");
  return user;
}

async function getAll() {
  const users = await knex("users").whereNull("deleted_at").select("*");
  return users;
}

async function update(id, properties) {
  const [user] = await knex("users")
    .where({ id })
    .whereNull("deleted_at")
    .update(properties)
    .returning("*");
  return user;
}

async function deleteUser(id) {
  const [user] = await knex("users")
    .where({ id })
    .whereNull("deleted_at")
    .update({ deleted_at: knex.fn.now() })
    .returning("*");
  return user;
}

module.exports = {
  create,
  getByEmail,
  getById,
  getAll,
  update,
  delete: deleteUser,
};
