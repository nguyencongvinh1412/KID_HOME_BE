const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Account = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  roleId: { type: ObjectId, ref: "role" , required: true},
  phoneNumber: {
    type: String,
    minLength: 10,
    maxLength: 11,
    required: false,
  },
  displayAddress: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    required: false,
    default: false
  },
  gender: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("account", Account);
