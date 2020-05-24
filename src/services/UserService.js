const Token = require('../models/Token')
const jwt = require("jsonwebtoken")

module.exports = {
    async tokenValidade(user, email){
        const tokenModel = await Token.findOne({ email })
        if (tokenModel && tokenModel.isValid(tokenModel.token || '')) {
            return tokenModel.token
        }
        
        const token = user.generateToken()
        const iat = new Date(jwt.decode(token).iat * 1000)
        const exp = new Date(jwt.decode(token).exp * 1000)
        await Token.findOneAndRemove({ email })
        await Token.create({ token: token, userId:user._id, name: user.name, email: user.email, generation: iat, expiration: exp })

        return token
    }
}