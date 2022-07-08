import React from 'react'
import {Row, Col} from 'react-bootstrap'
import { List,ListItem,Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

const FlashcardBack = (item) => {
 
  return (
    <div>
        <Container>
          <h3>{item.item.name}</h3>
        </Container>
        <Container>
          <Row className='mt-4'>
            <Col>
                <div>
                  <h4>Ingredients</h4>
                  <List dense = {true}>
                    {item.item.ingredients.map((ingredient) => (
                      <ListItem id='ingredient-list' key={ingredient}>{ ingredient }</ListItem>
                    ))}
                  </List>
                </div>
            </Col>
            <Col>
                <div>
                  <h4>Description:</h4>
                  <p>{item.item.description}</p>
                </div>
            </Col>
            <Col>
              <h4>Pairs With</h4>
              <List dense={true}>
                {item.item.tags.map((tag) => (
                  <ListItem id="ingredient-list" key={tag}>{ tag }</ListItem>
                ))}
              </List>
            
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default FlashcardBack
