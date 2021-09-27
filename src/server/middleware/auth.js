const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const apiKey = req.query.apiKey;
        if (token) {
            const decoded = jwt.verify(token, 'urlShortener');
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token});
            if (!user) {
                throw new Error()
            }
            req.token = token;
            if (user) {
                req.user = user;
            }
        } else if (apiKey) {
            const user = await User.findOne({ apikey: apiKey});
            if (!user) {
                throw new Error()
            }
            if (user) {
                req.user = user;
            }
        }  
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth