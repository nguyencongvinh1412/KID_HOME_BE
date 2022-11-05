const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Blog = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: ObjectId, ref: "account", required: true},
  centre: {type: ObjectId, ref: "centre", required: true},
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("blog", Blog);
