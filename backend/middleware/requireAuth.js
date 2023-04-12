const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) return res.status(401).json({ error: 'You are not authorization' })

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({ _id }).select(_id)
        next()
    } catch(error) {
        res.status(401).json({ error: 'User is not authorizated' })
    }
}

module.exports = requireAuth