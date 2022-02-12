const jwt = require('jsonwebtoken')
const config = require('config')
const Token = require('../models/Token')

class TokenService {
    // accessToken, refreshToken, expiresIn
    generate(payload) {
        const accessToken = jwt.sign(payload, config.get('secretKey'), {
            expiresIn: '1h'
        })
        const refreshToken = jwt.sign(payload, config.get('refreshSecretKey'))
        return {
            accessToken, refreshToken, expiresIn: 3600
        }
    }
    async save(user, refreshToken) {
        const data = await Token.findOne({ user })
        if(data) {
            data.refreshToken = refreshToken
            return data.save()
        }

        const token = await Token.create({ user, refreshToken })
        return token
    }
    validateAccessToken(accessToken) {
        try {
            return jwt.verify(accessToken, config.get('secretKey'))
        } catch (error) {
            return null
        }
    }
    validateRefreshToken(refreshToken) {
        try {
            return jwt.verify(refreshToken, config.get('refreshSecretKey'))
        } catch (error) {
            return null
        }
    }
    async findToken(refreshToken) {
        try {
            return await Token.findOne({ refreshToken })
        } catch (error) {
            return null
        }
    }
}

module.exports = new TokenService()
