const app = require("./server-config.js");
const routes = require("./server-routes.js");

const port = process.env.PORT || 5000;

app.get("/todos", routes.getAllTodos);
app.get("/todos/:id", routes.getTodo);

app.post("/todos", routes.postTodo);
app.patch("/todos/:id", routes.patchTodo);

app.delete("/todos", routes.deleteAllTodos);
app.delete("/todos/:id", routes.deleteTodo);

app.post("/users", routes.createUser);
app.get("/users", routes.getAllUsers);
app.get("/users/:id", routes.getUser);
app.get("/users/email/:email", routes.findByEmail);
app.delete("/users/:id", routes.deleteUser);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
