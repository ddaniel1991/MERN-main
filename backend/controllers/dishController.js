const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')



const Dish = require('../models/dishModel')
// @desc Get All Dishes
//@route  GET /api/dishes
//@access Private

const getDishes = asyncHandler(async (req,res) => {
    const dishes = await Dish.find({user: req.user.id})
    res.status(200).json(dishes)

})

// @desc Get One Dish
//@route  GET /api/dishes
//@access Private

const getDish = asyncHandler(async (req,res) => {
    const dishes = await Dish.findById({_id: req.params.id})
    res.status(200).json(dishes)

})

// @desc Create a Dish
//@route  Post /api/dishes
//@access Private

const createDish = asyncHandler(async (req,res) => {
    console.log(req.body)
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add a dish name')
    }

    const dish = await Dish.create({

        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        tags: req.body.tags,
        allergens: req.body.allergens,
        image: req.body.image,
        user: req.user.id
        
    })

    
    res.status(200).json(dish);

}); 

// @desc Update Dish
//@route  PUT /api/dishes/:id
//@access Private

const updateDish = asyncHandler(async (req,res) => {

    const dish = await Dish.findById(req.params._id)

    if(!dish) {
        res.status(400)
        throw new Error("Dish not found")
    }


    //check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User Not Found')
    }

    // make sure logged in user matches dish user
    if(dish.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedDish = await Dish.findByIdAndUpdate(req.params._id, req.body, {new: true})

    res.status(200).json(updatedDish);

})

// @desc Delete Dish
//@route  DELETE /api/dishes
//@access Private

const deleteDish = asyncHandler(async (req,res) => {

    const dish = await Dish.findById(req.params.id)

    if(!dish) {
        res.status(400)
        throw new Error("Dish not found")
    }


    //check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User Not Found')
    }

    // make sure logged in user matches dish user
    if(dish.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }


    await dish.remove()
    res.status(200).json({id: req.params.id});

})



module.exports = {
    getDishes, 
    getDish,
    createDish, 
    updateDish, 
    deleteDish
}