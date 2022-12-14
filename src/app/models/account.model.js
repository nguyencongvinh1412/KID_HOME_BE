const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Account = new Schema({
  avatar: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  roleId: { type: ObjectId, ref: "role" , required: true},
  phoneNumber: {
    type: String,
    minLength: 10,
    maxLength: 20,
    required: true,
  },
  displayAddress: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  gender: {
    type: String,
    required: true,
  },
  cityCode: {
    type: ObjectId,
    ref: "city",
    required: true
  },
  districtCode: {
    type: ObjectId,
    ref: "district",
    required: true
  },
  wardCode: {
    type: ObjectId,
    ref: "ward",
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("account", Account);
