const mongoose = require('mongoose')

const TransactionTypeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    } 
}, {
    timestamps: true
})

module.exports = mongoose.model('TransactionType', TransactionTypeSchema)