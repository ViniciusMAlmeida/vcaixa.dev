const Transaction = require('../models/Transaction')
const { TransactionType } = require('../models/TransactionType')

module.exports = {
    async index(req, res) {
        try {
            const { page = 1 } = req.query
            const transaction = await Transaction.paginate({}, { page, limit: 10 })
            res.status(200).json(transaction)
        } catch (error) {
            return res.status(400).json({ error: "Falha ao listar as movimentações."})
        }
    },

    async show(req, res) {
        try {
            const transaction = await Transaction.findById(req.params.id)
            res.status(200).json(transaction)
        } catch (error) {
            return res.status(400).json({ error: "Falha ao listar a movimentação."})
        }
    },

    async store(req, res) {
        try {
            const transactionType = await TransactionType.findOne({ name: req.body.TransactionType })
            if(!transactionType) {
                return res.json({ error: 'Categoria não encontrada.'})
            }

            const transaction = await Transaction.create({
                type: req.body.type,
                TransactionType: transactionType,
                value: req.body.value,
                description: req.body.description || ''
            })
            
            return res.json({
                message: "Registro de movimentação criado com sucesso!",
                data: transaction
            })
        } catch (error) {
            res.status(400).json({ error: "Falha ao registrar movimentação"})
        }
    }
}