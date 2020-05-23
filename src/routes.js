const express = require('express')
const routes = express.Router()
const authMiddleware = require('./middlewares/auth')
const UserController = require('./controllers/UserController')
const TransactionTypeController = require('./controllers/TransactionTypeController')

routes.post('/user/register', UserController.register)
routes.post('/user/authenticate', UserController.authenticate)
routes.get('/user/me', authMiddleware, UserController.me)

routes.get('/transactionType', authMiddleware, TransactionTypeController.index)
routes.get('/transactionType/:id', authMiddleware, TransactionTypeController.show)
routes.post('/transactionType', authMiddleware, TransactionTypeController.store)
routes.put('/transactionType/:id', authMiddleware, TransactionTypeController.update)
routes.delete('/transactionType/:id', authMiddleware, TransactionTypeController.destroy)

module.exports = routes