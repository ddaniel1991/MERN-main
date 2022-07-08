import React from 'react'
import { Container} from 'react-bootstrap'
import { useLocation } from 'react-router-dom';


const FlashcardFront = (item) => {

  return (
    <div>
      <Container>
        <h3>{item.item.name}</h3>
      </Container>
      <Container>
        <img className="mb-4" height='30%' width='60%' src={process.env.PUBLIC_URL + item.item.image} alt={item.item.name} />
      </Container>
    </div>
  )
}

export default FlashcardFront
