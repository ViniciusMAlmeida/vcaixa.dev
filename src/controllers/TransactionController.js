const Transaction = require('../models/Transaction')
const { TransactionType } = require('../models/TransactionType')
const { getUserByToken } = require('../controllers/UserController')
const { getWallet } = require('../services/TransactionService')

module.exports = {

    async index(req, res) {
        try {
            const userId = await getUserByToken(req)
            const { page = 1 } = req.query
            const transaction = await Transaction.paginate({ userId: userId }, { page, limit: 10 })
            res.json(transaction)
        } catch (error) {
            return res.status(400).json({ error: "Falha ao listar as movimentações." })
        }
    },

    async show(req, res) {
        try {
            const userId = await getUserByToken(req)
            const transaction = await Transaction.findOne({ _id: req.params.id, userId: userId})
            if(!transaction){
                res.json({ error: "Movimentação não encontrada."})
            }
            res.json(transaction)
        } catch (error) {
            return res.status(400).json({ error: "Falha ao listar a movimentação." })
        }
    },

    async store(req, res) {
        try {
            const userId = await getUserByToken(req)
            const transactionType = await TransactionType.findOne({ name: req.body.TransactionType })
            if(!transactionType) {
                return res.json({ error: 'Categoria não encontrada.'})
            }

            const transaction = await Transaction.create({
                type: req.body.type,
                TransactionType: transactionType,
                value: req.body.value,
                description: req.body.description,
                userId: userId
            })
            
            return res.json({
                message: "Registro de movimentação criado com sucesso!",
                data: transaction
            })
        } catch (error) {
            res.status(400).json({ error: "Falha ao registrar movimentação" })
        }
    },

    async walletBalance(req, res) {
        try {
            const userId = await getUserByToken(req)
            const wallet = await getWallet(userId)
            res.json(wallet)
        } catch (error) {
            res.status(400).json({ error: "Falha ao listar saldo de movimentação." })
        }
    }
}