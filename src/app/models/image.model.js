const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Image = new Schema({
    url: {
        type: String,
        required: true,
        trim: true
    },
    centreId: {
        type: ObjectId,
        ref: "centre"
    }
}, {
    timestamps: true
})

module.exports = new mongoose.model('image', Image);