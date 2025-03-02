const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  user_id: {
    type: String,
    required: true, 
  },
  user_name: {
    type: String,
    required: true, 
  },
  user_avatar: {
    type: String,
    required: true, 
  },
  title: {
    type: String,
    required: true,
  },
 
  description:{
    type: String,
    required: false
  },
  elements: [
    {
      type: { type: String, required: true }, 
      content: { type: String, required: true } 
    }
  ],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;


