const mongoose = require("mongoose");
const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true
  },
  complete: {
    type: Boolean,
    default: false
  }
});

exports.module = Task;
