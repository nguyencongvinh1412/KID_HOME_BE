const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const City = new Schema({
  name: {type: String, required: true},
  slug: {type: String, required: true },
  type: {type: String, required: true},
  name_with_type: {type: String, required: true},
  code: {type: String, required: true},
});

module.exports = mongoose.model("city", City);
