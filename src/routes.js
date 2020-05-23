const express = require('express')
const routes = express.Router()
const authMiddleware = require('./middlewares/auth')
const UserController = require('./controllers/UserController')
const TransactionTypeController = require('./controllers/TransactionTypeController')

routes.post('/user/register', UserController.register)
routes.post('/user/authenticate', UserController.authenticate)
routes.get('/user/me', authMiddleware, UserController.me)

routes.post('/transactionType/register', authMiddleware, TransactionTypeController.register)

module.exports = routes