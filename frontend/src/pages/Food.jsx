import React from 'react'
import FoodTable from '../components/dishes/FoodTable'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDishes } from '../features/dishes/dishSlice'
import { reset as drinkReset } from '../features/drinks/drinkSlice'
import Spinner from '../components/Spinner'
import {Container, Button } from '@mui/material'
import { toast } from 'react-toastify'

const Food = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const { dishes, isLoading, isError, isSuccess, message } = useSelector((state) => state.dishes)
  const quizItems = []
  const quizItemIds = []

  const updateQuizItems = (itemId) => {

    if(quizItemIds.includes(itemId)) {
      const index = quizItemIds.indexOf(itemId)
      quizItemIds.splice(index, 1)
    }
    else {
      quizItemIds.push(itemId)
    }

  }

  useEffect(() => {
    if(!user) {
      navigate('/login')
  }
      dispatch(drinkReset())
      if(isError) {
          console.log(message);
      }
   
      dispatch(getDishes(user.token))
      // return () => {
      // dispatch(reset())
      // }

  }, [user, navigate, isError, message, dispatch])

  const handleQuizButton = () => {
    if(quizItemIds.length === 0) {
      toast.error('Please select an item to start quiz')
    }
    else{
      for(let x = 0; x < quizItemIds.length; x++) {
         for(let y = 0; y < dishes.length; y++) {
             if(quizItemIds[x] === dishes[y]._id) {
                 quizItems.push(dishes[y])
             }
         }
      }
  
      navigate('/quiz', {state: quizItems})
    }
  }

  // if(!user) {
  //   navigate('/login')
  //   return (
  //     <h3>You must be logged in to do that</h3>
  //   )
  // }

  if(isLoading) {
    return <Spinner />
  }
  
    return (
      <div>
        <h2>Menu Items</h2>
        <div className='quiz-me-button' margin='normal'>
        <Container className='mb-3' margin='normal' align='right'>
         
          {
            user.admin ? <Button href="/dishes/add" variant='contained' color='success'>New Dish</Button>
              : null
          }
        
          <Button variant='contained' color='secondary' onClick={handleQuizButton}>Quiz Me</Button>
        </Container>

        </div>
        <div>
        </div>
        <FoodTable updateQuizItems={updateQuizItems} dishes={dishes} />

           
        
      </div>
    )

  


}

export default Food
