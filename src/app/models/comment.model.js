const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Comment = new Schema({
  blog: { type: ObjectId,ref: "blog", required: true },
  author: { type: ObjectId, ref: "account", required: true },
  content: { type: String, required: true },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("comment", Comment);
