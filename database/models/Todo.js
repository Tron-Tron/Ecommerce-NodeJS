const mongoose = require("mongoose");

const { Schema } = mongoose;

const TodoSchema = new Schema({
  content: String,
});

module.exports = mongoose.model("Todo", TodoSchema);
