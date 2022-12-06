const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Children = new Schema({
  name: {type: String, required: true},
  age: {type: String, required: true},
  gender: {type: String, required: true},
  weigh: {type: String, required: true},
  height: {type: String, required: true},
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("children", Children);
