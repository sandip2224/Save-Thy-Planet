const mongoose = require('mongoose')

const violationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    caddress: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    lat: {
        type: Number,
        default: 0
    },
    lon: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('violationModel', violationSchema)