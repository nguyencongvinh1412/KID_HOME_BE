const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = new Schema({
    name: {
        type: String,
        required: true,
        default: 'parent',
        unique: true,
        enum: ['parent', 'centre-admin', 'centre-staff', 'superadmin']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('role', Role);