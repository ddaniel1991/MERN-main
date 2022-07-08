import React from 'react'
import food from '../img/dish.jpg'
import pair from '../img/pair.jpg'
import cocktail from '../img/cocktail.jpg'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Stack } from '@mui/material'

const Sections = () => {
    const cardSize = 300
  return (

    <Container >
        <div>
            <Stack direction={{xs:'column',sm:'column',md:'row'}} spacing={3}>
            <>
                <>
                    <Link to="/dishes">
                        <Card style={{   }}>
                        <Card.Img src={food} height={cardSize} width={cardSize} />
                        <Card.Body>
                            <Card.Title className=''>Dishes</Card.Title>
                        </Card.Body>
                        </Card>
                    </Link>
                </>
                <>
                    <Link to="/drinks">
                        <Card style={{   }}>
                        <Card.Img src={cocktail} height={cardSize} width={cardSize} />
                        <Card.Body>
                            <Card.Title>Drinks</Card.Title>
                        </Card.Body>
                        </Card>
                    </Link>

                </>
                {/* <>
                    <Link to="/pairings">
                        <Card style={{  }}>
                        <Card.Img src={pair} height={cardSize} width={cardSize} />
                        <Card.Body>
                            <Card.Title>Pairings</Card.Title>
                        </Card.Body>
                        </Card>
                    </Link>
                </> */}
            </>
            </Stack>

       
        </div>
    </Container>
  )
}

export default Sections
