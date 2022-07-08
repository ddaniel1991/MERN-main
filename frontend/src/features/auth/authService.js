// Services are generally used for making the http request, and sending the data back
// and setting any data in local storage

//axios is a depency that enables this
import axios from 'axios'

const API_URL = '/api/users/'

//register user
const register = async (userData) => {
    const response = await axios.post(API_URL,userData)

    //when making a request from axios, axios will put the data inside of an object called data
    if(response.data) {
        //puts the userdata into local storage, this will include the token
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login',userData)

    //when making a request from axios, axios will put the data inside of an object called data
    if(response.data) {
        //puts the userdata into local storage, this will include the token
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//logout user
const logout = () => {
    //destroy user token
    localStorage.removeItem('user')
}

export const authService = {
    register, logout, login
}

export default authService
