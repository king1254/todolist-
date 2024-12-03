require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes

// Add a new Todo
app.post('/add', async (req, res) => {
    try {
        const { task } = req.body;
        const newTodo = await TodoModel.create({ task, done: false });
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task', details: err.message });
    }
});

// Get all Todos
app.get('/get', async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve tasks', details: err.message });
    }
});

// Mark a Todo as done
app.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, { done: true }, { new: true });
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update task status', details: err.message });
    }
});

// Update Todo task content
app.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { task } = req.body;
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, { task }, { new: true });
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update task', details: err.message });
    }
});

// Delete a Todo
app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await TodoModel.findByIdAndDelete(id);
        res.status(200).json(deletedTodo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task', details: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

module.exports = app;
