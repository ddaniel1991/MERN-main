// Services are generally used for making the http request, and sending the data back
// and setting any data in local storage

//axios is a depency that enables this
import axios from 'axios'

const API_URL = '/api/dishes/'

// fetch all dishes
const getDishes = async (token) =>  {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data

}

//fetch one dish
const getDish = async (dishID,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + dishID, config)
    return response.data
}

// create new dish
const createDish = async (dishData, token) =>  {
    // create authorization header in order to configure post request
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, dishData, config)

    return response.data

}

const updateDish = () => {

}

const deleteDish =  async (dishId, token) =>  {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + dishId, config)
    return response.data

}

const displayDish = () => {

}


export const  dishService = {
    createDish, 
    getDishes,
    getDish,
    updateDish,
    deleteDish,
    displayDish
}

export default dishService