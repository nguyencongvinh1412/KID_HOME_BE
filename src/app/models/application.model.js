const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Application = new Schema({
  children: {type: ObjectId, required: true, ref: "children"},
  parent: {type: ObjectId, required: true, ref: "account"},
  centre: {type: ObjectId, required: true, ref: "centre"},
  state: {type: ObjectId, required: true, ref: "applicationState"},
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("application", Application);
