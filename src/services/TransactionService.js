const Transaction = require('../models/Transaction')

module.exports = {
    async getWallet(userId) {
        
        const start = new Date()
        start.setHours(0,0,0,0)
        const end = new Date()
        end.setHours(23,59,59,999)

        const walletBalance = await Transaction.aggregate([
            { 
                $match: { 
                    userId: userId,
                    date: { $gte: start, $lt: end }
                } 
            },
            { 
                $project: {
                    _id: 0,
                    data: "$date",
                    id: "$_id",
                    categoria: {
                        id: "$TransactionType._id",
                        name: "$TransactionType.name"
                    },
                    tipo: "$type",
                    valor: "$value",
                    descricao: "$description"
                } 
            }
        ])

        const credit = walletBalance
            .filter(transaction => transaction.tipo === 'Entrada')
            .reduce((sum, transaction) => {
                return sum + transaction.valor
            }, 0)

        const debit = walletBalance
            .filter(transaction => transaction.tipo === 'Saída')
            .reduce((sum, transaction) => {
                return sum + transaction.valor
            }, 0)

        const ballance = credit - debit

        return {
            saldoTotal: ballance,
            movimentacoes: walletBalance
        }
    }
}