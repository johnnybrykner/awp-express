const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: String,
  question: String,
  upvotes: Number,
  downvotes: Number,
  answers: Array,
});

module.exports = {
  Question: mongoose.model("Question", questionSchema),
};
