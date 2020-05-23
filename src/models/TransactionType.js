const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const TransactionTypeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    } 
}, {
    timestamps: true
})

TransactionTypeSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('TransactionType', TransactionTypeSchema)