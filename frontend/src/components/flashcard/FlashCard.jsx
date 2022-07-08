import React, {useState, useEffect} from 'react'
import ReactCardFlip from 'react-card-flip'
import FlashcardBack from './FlashcardBack'
import FlashcardFront from './FlashcardFront'
import { Button,ButtonGroup, Container } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import  Spinner  from '../Spinner'


const FlashCard = () => {
  const {user} = useSelector((state) => state.auth)
  const { dishes } = useSelector((state) => state.dishes)
  const { drinks } = useSelector((state) => state.drinks)
  const [flipped,setFlipped] = useState(false)
  const [index, setIndex] = useState(0);
  const navigate = useNavigate()
  const location = useLocation()

  const quizItems = location.state


    //function to cycle through dish indices
    const handleCardCycle = (increment) => {

        if(index <= 0 && increment < 0) {
            setIndex(quizItems.length-1);
        } 
        else if(index >= quizItems.length - 1 && increment > 0) {
            setIndex(0)
        }
        else {
            setIndex(index + increment)
        }
    }
  if(quizItems === null) {
      return(
        <h3>Select the items you wish to study from the Dishes or Drinks tab </h3>
      )
  }  
    
  return (
    
      
    <div>
        <Container>
            <ButtonGroup className='mt-4' margin='normal'>
                <Button onClick={() => handleCardCycle(-1)} variant='contained' color='error'>Back</Button>
                <Button onClick={() => setFlipped((prev) => !prev)} variant='contained'>Flip</Button>
                <Button onClick={() => handleCardCycle(1) } variant='contained' color='success'>Next</Button>
            </ButtonGroup>    
        </Container>
        <Container>  
            <ReactCardFlip isFlipped={flipped} flipDirection='horizontal'>
                    <div>
                        <FlashcardFront item={quizItems[index]} />
                    </div>
                    <div>
                        <FlashcardBack item={quizItems[index]} />
                    </div>
            </ReactCardFlip>
        </Container>    


        </div>


  )}

export default FlashCard
