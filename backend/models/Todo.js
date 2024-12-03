const mongoose = require('mongoose');

// Define Schema
const TodoSchema = new mongoose.Schema({
    task: { type: String, required: true },
    done: { type: Boolean, default: false },
}, { timestamps: true });

// Create Model
const TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = TodoModel;
