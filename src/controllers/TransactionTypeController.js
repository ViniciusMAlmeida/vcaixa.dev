const TransactionType = require('../models/TransactionType')

module.exports = {
    async index(req, res) {
        try {
            const { page = 1 } = req.query
            const transactionTypes = await TransactionType.paginate({}, { page, limit: 10 })
            return res.json(transactionTypes)
        } catch (error) {
            return res.status(400).json({ error: "Falha ao listar as categorias de movimentação." })
        }
    },

    async show(req, res) {
        try {
            const transactionType = await TransactionType.findById(req.params.id)
            return res.json(transactionType)
        } catch (error) {
            return res.status(400).json({ error: "Falha ao listar a categoria de movimentação." })
        }
    },

    async store (req, res) {
        const { name } = req.body

        try {
            if(await TransactionType.findOne({ name })){
                return res.status(400).json({ error: "Esta categoria de movimentação já existe." })
            }

            const transactionType = await TransactionType.create(req.body)
            return res.json({
                message: "Categoria de movimentação criada com sucesso!",
                data: transactionType
            })
        } catch (error) {
            res.status(400).json({ error: "Falha ao cadastrar categoria de movimentação"})
        }
    },

    async update(req, res) {
        try {
            const transactionType = await TransactionType.findByIdAndUpdate(req.params.id, req.body, { new:true })
            res.status(200).json({
                message: "Categoria atualizada com sucesso.",
                data: transactionType
            })
        } catch (error) {
            res.status(400).json({ error: "Falha ao atualizar categoria de movimentação."})
        }
    },

    async destroy(req, res) {
        try {
            const transactionType = await TransactionType.findByIdAndRemove(req.params.id)
            res.status(200).json({
                message: "Categoria removida com sucesso.",
                data: transactionType
            })
        } catch (error) {
            res.status(400).json({ error: "Falha ao remover categoria de movimentação."})
        }
    }
}