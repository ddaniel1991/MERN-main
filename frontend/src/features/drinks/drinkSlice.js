import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import drinkService from './drinkService'


// get user from local storage
// const user = JSON.parse(localStorage.getItem('user'))

// declaring initial state
const initialState = {
    drinks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
/*
    Create New Drink
    used in AddFoodItemForm
*/
export const createDrink = createAsyncThunk('drinks/create', async (drinkData, thunkAPI) => {
    try {
        // retrieve token from user
        const token = thunkAPI.getState().auth.user.token
        //makes call to drinkService register function which will handle http request
        return await drinkService.createDrink(drinkData, token)
    } catch (error) {
        //if an error is returned, search in several places for the error message and return it
        const message = (error.response && error.response.data && error.response.data.message) || 
            error.message || error.toString()
        
        // returns error message as payload
        return thunkAPI.rejectWithValue(message)    
    }
})


export const updateDrink = createAsyncThunk()


/* 
    Retrieves all drinks from database
    used in FoodTable component
*/
export const getDrinks = createAsyncThunk('drinks/getAll', async (_, thunkAPI) => {
    try {
        // retrieve token from user
        const token = thunkAPI.getState().auth.user.token
        //makes call to drinkService getDrinks function which will handle http request
        return await drinkService.getDrinks(token)
    } catch (error) {
        //if an error is returned, search in several places for the error message and return it
        const message = (error.response && error.response.data && error.response.data.message) || 
        error.message || error.toString()
        
        // returns error message as payload
        return thunkAPI.rejectWithValue(message)   
    }
})
/* 
    Retrieves on drink from database
    not yet used


*/
export const getDrink = createAsyncThunk('drinks/getOne', async (drinkID, thunkAPI) => {
    try {
        // retrieve token from user
        const token = thunkAPI.getState().auth.user.token
        //makes call to drinkService getDrinks function which will handle http request
        return await drinkService.getDrink(drinkID,token)
    } catch (error) {
        //if an error is returned, search in several places for the error message and return it
        const message = (error.response && error.response.data && error.response.data.message) || 
        error.message || error.toString()
        
        // returns error message as payload
        return thunkAPI.rejectWithValue(message)   
    }
})

export const deleteDrink = createAsyncThunk('drinks/delete', async (drinkId, thunkAPI) => {
    try {
        // retrieve token from user
        const token = thunkAPI.getState().auth.user.token
        //makes call to drinkService deleteDrink function which will handle http request
        return await drinkService.deleteDrink(drinkId, token)
    } catch (error) {
        //if an error is returned, search in several places for the error message and return it
        const message = (error.response && error.response.data && error.response.data.message) || 
        error.message || error.toString()
        
        // returns error message as payload
        return thunkAPI.rejectWithValue(message)   
    }
})



export const drinkSlice = createSlice({
    name: 'drink',
    initialState,
    reducers: {
        reset: (state) => initialState

    },
    extraReducers: (builder) => {
        builder
            // create drink
            .addCase(createDrink.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createDrink.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.drinks.push(action.payload)
            })
            .addCase(createDrink.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //get all drinks
            .addCase(getDrinks.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getDrinks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.drinks = action.payload
            })
            .addCase(getDrinks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //get one drink
            .addCase(getDrink.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getDrink.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.drinks = action.payload
            })
            .addCase(getDrink.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // delete a drink
            .addCase(deleteDrink.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(deleteDrink.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.drinks = state.drinks.filter((drink) => drink._id !== action.payload.id)
            })
            .addCase(deleteDrink.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }
})


export const {reset} = drinkSlice.actions
export default drinkSlice.reducer