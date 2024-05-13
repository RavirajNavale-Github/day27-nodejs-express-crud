const express = require("express");
const todos = require("./todos.json");

const app = express();

//Activate Middleware
// app.use(express.urlencoded({extended: false}));

//get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

//get perticular todo according to ID passes
app
  .route("/todos/:id")
  .get((req, res) => {
    // console.log(req.params.id);
    const id = parseInt(req.params.id);

    const todo = todos.find((todo) => {
      return todo.id === id;
    });

    if (!todo) {
      res.status(404).send("Todo not Found");
    } else {
      res.json(todo);
    }
  })
  .put((req, res) => {})
  .delete((req, res) => {});

//Create new user
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  console.log(newTodo);

  newTodo.id = todos.length + 1;

  todos.push(newTodo);

  res.send(todos)
});

app.listen(3000, () => {
  console.log("Server Listening to port 3000");
});
