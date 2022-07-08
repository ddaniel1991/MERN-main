// Services are generally used for making the http request, and sending the data back
// and setting any data in local storage

//axios is a depency that enables this
import axios from 'axios'

const API_URL = '/api/drinks/'

// fetch all drinks
const getDrinks = async (token) =>  {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data

}

//fetch one drink
const getDrink = async (drinkID,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + drinkID, config)
    return response.data
}

// create new drink
const createDrink = async (drinkData, token) =>  {
    // create authorization header in order to configure post request
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, drinkData, config)

    return response.data

}

const updateDrink = () => {

}

const deleteDrink =  async (drinkId, token) =>  {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + drinkId, config)
    return response.data

}

const displayDrink = () => {

}


export const  drinkService = {
    createDrink, 
    getDrinks,
    getDrink,
    updateDrink,
    deleteDrink,
    displayDrink
}

export default drinkService