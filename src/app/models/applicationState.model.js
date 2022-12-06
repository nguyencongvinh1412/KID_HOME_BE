const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// TODO: submit, accept, reject, cancel
const ApplicationState = new Schema({
  name: {type: String, required: true},
  color: {type: String, required: true},
  backgroundColor: {type: String, required: true}
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("applicationState", ApplicationState);
