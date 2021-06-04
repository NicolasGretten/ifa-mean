const mongoose = require('mongoose')

const ClientSchema = mongoose.Schema({
    name: { type: String},
    pass: { type: String},
    mail: { type: String},
    key: { type: String},
    tasks: [{ title: String, content: String, state: Number}],
})

module.exports = mongoose.model('User', ClientSchema)
