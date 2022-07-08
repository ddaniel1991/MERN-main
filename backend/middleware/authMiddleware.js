const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')



const protect = asyncHandler(async (req,res,next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from header
            //auth header presents token as 'Bearer *token*' 
            //splitting by space and grabbing second value which will isolate token
            token = req.headers.authorization.split(' ')[1]
            //Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from the token
            //Returns user object without the password
            req.user = await User.findById(decoded.id).select('-password')
            next()


            
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }
    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})




module.exports = {
    protect,
}