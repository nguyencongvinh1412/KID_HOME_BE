const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Parent = new Schema({
    accountId: {type: ObjectId, ref: 'account', required: true}
}, {
    timestamps: true
})

module.exports = new mongoose.model('parent', Parent);