const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Ward = new Schema({
  name: {type: String, required: true},
  code: {type: Number, required: true },
  codename: {type: String, required: true},
  division_type: {type: String, required: true},
  short_codename: {type: String, required: true},
  district_code: {type: String, required: true},
});

module.exports = mongoose.model("ward", Ward);