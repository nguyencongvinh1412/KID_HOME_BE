const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Centre = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: Number,
    min: 10,
    max: 12,
  },
  gelocation: {
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  openHours: {
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
  },
  description: {
    type: String,
    required: true,
  },
  yearEstablished: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
  }
}, {
    timestamps: true
});

module.exports = mongoose.model("center", Centre);
