const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4001;

let todos = [];

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.get("/api/todos", function (req, res) {
    res.json(todos);
});

app.post("/api/todos", function (req, res) {
    const { name } = req.body;
    console.log("post: " + name);

    const newTodo = {
        id: uuidv4(),
        name: name,
        complete: false,
    };

    todos.push(newTodo);

    return res.json(newTodo);
});

app.put("/api/todos/:id", function (req, res) {
    const { name, complete } = req.body;
    const id = req.params.id;

    const updatedTodo = {
        id: id,
        name: name,
        complete: complete,
    };

    todos = todos.map((todo) => {
        if (todo.id === id) {
            return updatedTodo;
        }
        return todo;
    });

    res.json(updatedTodo);
    
    console.log("put: " + id);
});

app.delete("/api/todos/:id", function (req, res) {
    const id = req.params.id;

    todos = todos.filter((todo) => todo.id !== id);

    res.json(todos);
    console.log("delete: " + id);
});

app.listen(PORT, function () {
    console.log("Server running at PORT = " + PORT);
});
