const express = require("express");
const todos = require("./todos.json");
const fs = require("fs");

const app = express();

//Activate Middleware
app.use(express.json());

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
  .put((req, res) => {
    const id = parseInt(req.params.id);
    const updatedTodo = req.body;
    // console.log(updatedTodo);

    const index = todos.findIndex((todo) => id === todo.id);

    if(index === -1){
      res.status(404).send("Todo not found");
      return;
    }else{
      todos[index] = {...todos[index], ...updatedTodo};
      res.send("Todo updated successfully :)");
    }
  })
  .delete((req, res) => {
      const id = parseInt(req.params.id);
      const index = todos.findIndex((todo) => id === todo.id);
    
      if(index === -1){
        res.status(404).send("Todo not found");
        return;
      }else{
        todos.splice(index, 1);
        res.send("Todo deleted successfully :)");
      }
  });

//Create new user
app.post("/todos", (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    todos.push({
      id: todos.length + 1,
      ...body
    });
    res.send("Todo created successfully :)");
  } catch {
    return res.status(500).send("Error in posting todo");
  }
});

app.listen(3000, () => {
  console.log("Server Listening to port 3000");
});
