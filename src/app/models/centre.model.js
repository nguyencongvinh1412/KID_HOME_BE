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
    type: String,
    minLength: 10,
    maxLength: 11,
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
  geolocation: {
    type: {
      type: String,
      enum: ['Point'],
      required: false
    },
    coordinates: {
      type: [Number],
      required: false
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

module.exports = mongoose.model("centre", Centre);
