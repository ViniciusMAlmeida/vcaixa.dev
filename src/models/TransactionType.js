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

module.exports = {
    TransactionType: mongoose.model('TransactionType', TransactionTypeSchema),
    TransactionTypeDTO: TransactionTypeSchema
}