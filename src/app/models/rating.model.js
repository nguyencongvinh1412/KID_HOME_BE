const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Rating = new Schema({
  content: {type: String, required: true},
  author: {type: ObjectId, ref: "account", required: true},
  centre: {type: ObjectId, ref: "centre", required: true},
  rating: {type: Number, required: true},
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("rating", Rating);
