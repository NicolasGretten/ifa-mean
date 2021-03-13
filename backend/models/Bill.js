const mongoose = require('mongoose')

const billSchema = mongoose.Schema({
  billNumber: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  client: { type: Object },
  prestations: { type: Array },
  discount: { type: Number },
  paid: { type: Number },
  tva: { type: Boolean },
  tvaRate: { type: Number },
  allPaid: { type: Boolean },
  waiting: { type: Boolean },
  revival: { type: Boolean }
})

module.exports = mongoose.model('Bill', billSchema)