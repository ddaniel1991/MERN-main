import React from 'react'
import { ButtonGroup, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import  {deleteDrink}  from '../../features/drinks/drinkSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ConfirmDelete = () => {


    const { user } = useSelector((state) => state.auth)
    const location = useLocation()
    const navigate = useNavigate()
    const { drink } = location.state
    const { drinks, isLoading, isError, isSuccess, message } = useSelector((state) => state.drinks)

  
    const dispatch = useDispatch()

    const handleDelete = async (e) => {
      e.preventDefault()
      await dispatch(deleteDrink(drink._id))
      if(isSuccess === true){
        navigate('/drinks')
      }
      if(isError === true) {
        toast.error(message)
      }
    }
  return (
    <div>
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to delete {drink.name}?</h3>
        <ButtonGroup>
            <Button variant='contained' color='info'> Cancel </Button>
            <Button variant='contained' color='error'  onClick={handleDelete}> Delete </Button>
        </ButtonGroup>
    </div>
  )
}

export default ConfirmDelete