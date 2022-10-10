const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CentreUser = new Schema({
  accountId: {type: ObjectId, ref: 'account'},
  centreId: {type: ObjectId, ref: 'centre'},
}, {
    timestamps: true
});

module.exports = mongoose.model("centre_user", CentreUser);
