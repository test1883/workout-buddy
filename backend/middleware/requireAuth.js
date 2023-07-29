const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({error: "Authorization token required"})
    }
    // Bearer sfheh3i4hj2nr3dkwekrh3hk2
    const token = authorization.split(" ") [1]
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id}).select("_id")
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Request is not authorized"})
    }

}

module.exports = requireAuth