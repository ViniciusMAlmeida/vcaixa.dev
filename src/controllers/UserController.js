const User = require('../models/User')
const Token = require('../models/Token')
const jwt = require("jsonwebtoken")

module.exports = {
    async register(req, res) {
        const { email } = req.body

        try {
            if (await User.findOne({ email })) {
                return res.status(400).json({ error: "Este usuário já existe." })
            }

            const user = await User.create(req.body)

            return res.json({ user })
        } catch (err) {
            return res.status(400).json({ error: "Falha ao cadastrar usuário." })
        }
    },

    async authenticate(req, res) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user || !(await user.compareHash(password))) {
                return res.status(400).json({ error: "Usuário ou senha inválido." })
            }

            const tokenModel = await Token.findOne({ email })
            if (tokenModel && tokenModel.isValid(tokenModel.token || '')) {
                return res.json({
                    user,
                    token: tokenModel.token
                })
            }

            const token = user.generateToken()
            const iat = new Date(jwt.decode(token).iat * 1000)
            const exp = new Date(jwt.decode(token).exp * 1000)
            await Token.findOneAndRemove({ email })
            await Token.create({ token: token, userId:user._id, name: user.name, email: user.email, generation: iat, expiration: exp })

            return res.json({
                user,
                token: token
            })
        } catch (err) {
            return res.status(400).json({ error: "Falha ao autenticar usuário." })
        }
    },

    async me(req, res) {
        try {
            const { userId } = req

            const user = await User.findById(userId)

            return res.json({
                user: {
                    name: user.name,
                    email: user.email
                }
            })
        } catch (err) {
            return res.status(400).json({ error: "Não foi possível obter informações deste usuário." })
        }
    },

    async getUserByToken(req) {
        const authHeader = req.headers.authorization
        const [scheme, bearerToken] = authHeader.split(" ")
        const token = await Token.findOne({ token: bearerToken })
        return token.userId
    }
}