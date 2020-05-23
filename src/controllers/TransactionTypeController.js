const TransactionType = require('../models/TransactionType')

module.exports = {
    async register (req, res) {
        const { name } = req.body

        try {
            if(await TransactionType.findOne({ name })){
                return res.status(400).json({ error: "Esta categoria de movimentação já existe."})
            }

            const transactionType = await TransactionType.create(req.body)
            return res.json({
                message: "Categoria de movimentação criada com sucesso!",
                data: {
                    transactionType
                }
            })
        } catch (error) {
            res.status(400).json({ error: "Falha ao cadastrar categoria de movimentação"})
        }
    }
}