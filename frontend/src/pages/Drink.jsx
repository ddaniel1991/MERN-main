import React from 'react'
import DrinkTable from '../components/drinks/DrinkTable'
import {useSelector, useDispatch} from 'react-redux'
import { Button, Container } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getDrinks } from '../features/drinks/drinkSlice'
import { reset as dishReset } from '../features/dishes/dishSlice'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

const Drink = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const { drinks, isLoading, isError, isSuccess, message } = useSelector((state) => state.drinks)
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

  const handleQuizButton = () => {
    if(quizItemIds.length === 0) {
      toast.error('Please select an item to start quiz')
    }
    else{
      for(let x = 0; x < quizItemIds.length; x++) {
         for(let y = 0; y < drinks.length; y++) {
             if(quizItemIds[x] === drinks[y]._id) {
                 quizItems.push(drinks[y])
             }
         }
      }
  
      navigate('/quiz', {state: quizItems})
    }
  }

  useEffect(() => {
      dispatch(dishReset())
      if(isError) {
          console.log(message);
      }
      if(!user) {
          navigate('/login')
      }
      dispatch(getDrinks(user.token))
      // return () => {
      // dispatch(reset())
      // }

  }, [user, navigate, isError, message, dispatch])



  if(isLoading) {
    return <Spinner />
  }
    return (

      <div>
        <h2>Menu Items</h2>
        <div className='quiz-me-button' margin='normal'>
        <Container className='mb-3' margin='normal' align='right'>
          {
            user.admin ? <Button href="/drinks/add" variant='contained' color='success'>New Drink</Button>
              : null
          }
          <Button variant='contained' color='secondary' onClick={handleQuizButton}>Quiz Me</Button>

        </Container>

        </div>
        <div>
        </div>
        <DrinkTable updateQuizItems={updateQuizItems} drinks={drinks} />

           
        
      </div>
    )
  
}

export default Drink
