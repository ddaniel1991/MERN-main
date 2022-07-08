const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')



// @desc Register New User
//@route  POST /api/users/
//@access Public
const registerUser = asyncHandler(async(req,res) => {
    const {name, email, password, admin} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    if(admin === null) {
        admin = false
    }

    //check if user exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        admin
    })

    //check to make sure user was created
    if(user) {
        res.status(201).json({
            _id: user.id,
            admin: user.admin,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }

})

// @desc Authenticate a User
//@route  POST /api/users/login
//@access Public
const loginUser = asyncHandler(async(req,res) => {

    const {email, password} = req.body

    //check for user email
    const user = await User.findOne({email})

    if(user && await bcrypt.compare(password,user.password)) {
        res.json({
            _id: user.id,
            admin: user.admin,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),

        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

// @desc Get User Data
//@route  GET /api/users/me
//@access Private
const getMe = asyncHandler(async(req,res) => {
    res.status(200).json(req.user)

})



// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}