const express = require('express');
const router = express.Router();
const { getDrinks, createDrink, updateDrink, deleteDrink } = require('../controllers/drinkController');
const {protect} = require('../middleware/authMiddleware')


router.route("/").get(protect, getDrinks).post(protect, createDrink);

router.route("/:id").put(protect, updateDrink).delete(protect, deleteDrink).get(protect)






module.exports = router