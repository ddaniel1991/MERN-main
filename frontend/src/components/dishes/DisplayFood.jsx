import { useLocation, Link } from 'react-router-dom'
import { List, ListItem, Container, Button } from '@mui/material'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { GiKnifeFork } from 'react-icons/gi'


const DisplayFood = () => {
  const {user} = useSelector((state) => state.auth)
  const location = useLocation()
  const { dish } = location.state


  console.log(dish)
  console.log(user);


  return (
    <div>
      <Container>
        <h2 className="mb-3">{dish.name}</h2>
        <hr/>
        { dish.image ?
        <img className="mb-3" src={process.env.PUBLIC_URL + dish.image} alt={dish.name} height="40%" width="70%" />
        : <GiKnifeFork size={ 150} />
        }
        <hr />
        <h4>Description</h4>
        <p>{dish.description}</p>
        <hr/>
        <Row>
          <Col>
            <h4 className='underline'>Ingredients</h4>
            <List dense={true}>
              
            { 
              dish.ingredients.map( (ingredient) =>  (
                <ListItem key={ingredient} id="ingredient-list">{ingredient}</ListItem>
              )) 
            }
            </List>
          </Col>
          <Col>
            <h4 className='underline'>Pairs With</h4>
            <List dense={true}>
            {
              dish.tags.map((tag) => (
                <ListItem key={tag} id="ingredient-list">{tag}</ListItem>
              ))
            }
            </List>
          </Col>
        </Row>
        <hr/>
        <Button variant="contained" color='warning' href="/dishes">Back</Button>
        <Button variant='contained' color='info' href={`/dishes/${dish._id}/edit`}>Edit</Button>
        <Link to={`/dishes/${dish._id}/confirm-delete`} state={{dish}}><Button variant="contained" color='error'>Delete</Button></Link>
        <hr/>
      </Container>
    </div>
         
  )
}

export default DisplayFood
