const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')



const Drink = require('../models/drinkModel')
// @desc Get All Drinks
//@route  GET /api/drinks
//@access Private

const getDrinks = asyncHandler(async (req,res) => {
    const drinks = await Drink.find({user: req.user.id})
    res.status(200).json(drinks)

})

// @desc Get One Drink
//@route  GET /api/drinks
//@access Private

const getDrink = asyncHandler(async (req,res) => {
    const drinks = await Drink.findById({_id: req.params.id})
    res.status(200).json(drinks)

})

// @desc Create a Drink
//@route  Post /api/drinks
//@access Private

const createDrink = asyncHandler(async (req,res) => {
    console.log(req.body)
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add a drink name')
    }

    const drink = await Drink.create({

        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        tags: req.body.tags,
        allergens: req.body.allergens,
        image: req.body.image,
        user: req.user.id
        
    })

    
    res.status(200).json(drink);

}); 

// @desc Update Drink
//@route  PUT /api/drinks/:id
//@access Private

const updateDrink = asyncHandler(async (req,res) => {

    const drink = await Drink.findById(req.params._id)

    if(!drink) {
        res.status(400)
        throw new Error("Drink not found")
    }


    //check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User Not Found')
    }

    // make sure logged in user matches drink user
    if(drink.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedDrink = await Drink.findByIdAndUpdate(req.params._id, req.body, {new: true})

    res.status(200).json(updatedDrink);

})

// @desc Delete Drink
//@route  DELETE /api/drinks
//@access Private

const deleteDrink = asyncHandler(async (req,res) => {

    const drink = await Drink.findById(req.params.id)

    if(!drink) {
        res.status(400)
        throw new Error("Drink not found")
    }


    //check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User Not Found')
    }

    // make sure logged in user matches drink user
    if(drink.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }


    await drink.remove()
    res.status(200).json({id: req.params.id});

})



module.exports = {
    getDrinks, 
    getDrink,
    createDrink, 
    updateDrink, 
    deleteDrink
}