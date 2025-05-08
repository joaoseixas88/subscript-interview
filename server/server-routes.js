const _ = require("lodash");
const todos = require("./database/todo-queries.js");
const users = require("./database/users-queries.js");

function createToDo(req, data) {
  const protocol = req.protocol,
    host = req.get("host"),
    id = data.id;

  return {
    title: data.title,
    order: data.order,
    completed: data.completed || false,
    url: `${protocol}://${host}/todos/${id}`,
  };
}

async function getAllTodos(req, res) {
  const allEntries = await todos.all();
  return res.send(allEntries.map(_.curry(createToDo)(req)));
}

async function getTodo(req, res) {
  const todo = await todos.get(req.params.id);
  return res.send(todo);
}

async function postTodo(req, res) {
  const created = await todos.create(req.body.title, req.body.order);
  return res.send(createToDo(req, created));
}

async function patchTodo(req, res) {
  const patched = await todos.update(req.params.id, req.body);
  return res.send(createToDo(req, patched));
}

async function deleteAllTodos(req, res) {
  const deletedEntries = await todos.clear();
  return res.send(deletedEntries.map(_.curry(createToDo)(req)));
}

async function deleteTodo(req, res) {
  const deleted = await todos.delete(req.params.id);
  return res.send(createToDo(req, deleted));
}

function addErrorReporting(func, message) {
  return async function (req, res) {
    try {
      return await func(req, res);
    } catch (err) {
      console.log(`${message} caused by: ${err}`);
      res.status(500).send(`Opps! ${message}.`);
    }
  };
}

async function createUser(req, res) {
  const user = await users.create(req.body.email);
  return res.send(user);
}

async function getAllUsers(req, res) {
  const allUsers = await users.getAll();
  return res.send(allUsers);
}

async function getUser(req, res) {
  const user = await users.getById(req.params.id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  return res.send(user);
}

async function findByEmail(req, res) {
  const user = await users.getByEmail(req.params.email);
  return res.send(user);
}

async function deleteUser(req, res) {
  const deleted = await users.delete(req.params.id);
  return res.send(deleted);
}

const toExport = {
  getAllTodos: {
    method: getAllTodos,
    errorMessage: "Could not fetch all todos",
  },
  getTodo: { method: getTodo, errorMessage: "Could not fetch todo" },
  postTodo: { method: postTodo, errorMessage: "Could not post todo" },
  patchTodo: { method: patchTodo, errorMessage: "Could not patch todo" },
  deleteAllTodos: {
    method: deleteAllTodos,
    errorMessage: "Could not delete all todos",
  },
  deleteTodo: { method: deleteTodo, errorMessage: "Could not delete todo" },
  createUser: { method: createUser, errorMessage: "Could not create user" },
  getAllUsers: { method: getAllUsers, errorMessage: "Could not get all users" },
  getUser: { method: getUser, errorMessage: "Could not get user" },
  findByEmail: {
    method: findByEmail,
    errorMessage: "Could not find user by email",
  },
  deleteUser: { method: deleteUser, errorMessage: "Could not delete user" },
};

for (let route in toExport) {
  toExport[route] = addErrorReporting(
    toExport[route].method,
    toExport[route].errorMessage
  );
}

module.exports = toExport;
