const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const { TransactionTypeDTO } = require('./TransactionType')

const TransactionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Entrada', 'Saída']
    },
    TransactionType: {
        type: TransactionTypeDTO
    },
    date: {
        type: Date,
        default: Date.now()
    },
    value: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

TransactionSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Transaction', TransactionSchema)