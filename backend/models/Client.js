const mongoose = require('mongoose')

const ClientSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String },
    function: { type: String },
    email: { type: String },
    company: { type: String },
    addedAt: { type: String },
    address: { type: Object },
})

module.exports = mongoose.model('Client', ClientSchema)