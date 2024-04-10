const express = require("express");
const mongoose = require("mongoose");
const Task = require("./task.js");

const app = express();
app.use(express.json());

const port = 3000;

// Connect to MongoDB when the application starts
mongoose.connect('mongodb://localhost:27017/avni', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.error(Error connecting to MongoDB: ${err});
    process.exit(1);
});

// GET: Retrieve all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Create a new task
app.post('/tasks', async (req, res) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(Server is running on port ${port});
});