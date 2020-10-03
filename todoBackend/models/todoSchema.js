const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name must be filled in",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

//name of model and schema
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
