const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CentreStaff = new Schema({
    accountId: {type: ObjectId, ref: 'account', required: true},
    centreId: {type: ObjectId, ref:'centre', required: true}
}, {
    timestamps: true
})

module.exports = new mongoose.model('centre_staff', CentreStaff);