const Transaction = require('../models/Transaction')

module.exports = {
    async getWallet(userId) {
        const walletBalance = await Transaction.aggregate([
            { $match: { userId: userId } },
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