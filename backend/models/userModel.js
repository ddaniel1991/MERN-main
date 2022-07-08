const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    admin: {
        type: Boolean,
    },
    dishes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Dish'
    },
    drinks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Drinks'
    }

},
{
    timestamps: true
})

module.exports = mongoose.model('User',userSchema)