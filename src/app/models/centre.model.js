const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Centre = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  cityCode: {
    type: ObjectId,
    ref: 'city',
    requried: true
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
  },
  displayAddress: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    minLength: 10,
    maxLength: 20,
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
    type: String,
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
  },
  fee: {
    type: String,
    requried: true
  },
  serviceType: {
    type: [String],
    required: true
  },
  author: {
    type: ObjectId,
    ref: "account",
    required: true
  }
}, {
    timestamps: true
});

Centre.index({geolocation: "2dsphere"});

module.exports = mongoose.model("centre", Centre);
