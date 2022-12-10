const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const InterateCentre = new Schema({
  countView: {type: Number, required: true, default: 0},
  user: {type: ObjectId, ref: "account", required: true},
  centre: {type: ObjectId, ref: "centre", required: true},
  rating: {type: Number, required: true, default: 0},
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("interateCentre", InterateCentre);
