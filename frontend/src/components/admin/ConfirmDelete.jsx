import React from 'react'
import { ButtonGroup, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import  {deleteDish}  from '../../features/dishes/dishSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ConfirmDelete = () => {


    const { user } = useSelector((state) => state.auth)
    const location = useLocation()
    const navigate = useNavigate()
    const { dish } = location.state
    const { dishes, isLoading, isError, isSuccess, message } = useSelector((state) => state.dishes)

  
    const dispatch = useDispatch()

    const handleDelete = async (e) => {
      e.preventDefault()
      await dispatch(deleteDish(dish._id))
      if(isSuccess === true){
        navigate('/dishes')
      }
      if(isError === true) {
        toast.error(message)
      }
    }
  return (
    <div>
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to delete {dish.name}?</h3>
        <ButtonGroup>
            <Button variant='contained' color='info'> Cancel </Button>
            <Button variant='contained' color='error'  onClick={handleDelete}> Delete </Button>
        </ButtonGroup>
    </div>
  )
}

export default ConfirmDelete