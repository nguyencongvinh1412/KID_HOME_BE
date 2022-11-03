const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const District = new Schema({
  name: {type: String, required: true},
  code: {type: Number, required: true },
  codename: {type: String, required: true},
  division_type: {type: String, required: true},
  short_codename: {type: String, required: true},
  city_code: {type: String, required: true},
});

module.exports = mongoose.model("district", District);
