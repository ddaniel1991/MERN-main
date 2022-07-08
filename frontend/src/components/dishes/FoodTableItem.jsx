import * as React from 'react'
import { useState } from 'react';
import {FaAngleUp, FaAngleDown} from 'react-icons/fa';
import {TableRow, TableCell, IconButton,Collapse, Box,Checkbox,Card,CardMedia,List,ListItem } from '@mui/material';
import {Link} from 'react-router-dom'

function FoodTableItem(props) {
  const { dish } = props;
  const [open, setOpen] = useState(false);

  const handleCheckboxChange = () => {
    props.updateQuizItems.updateQuizItems(dish._id)
  }
  
  return (
    
      <>
        <TableRow sx={{'& > *' : {borderBottom: 'unset'} }}>
          <TableCell>
            <IconButton 
              aria-label='expand row'
              size='small'
              onClick={() => setOpen(!open)}  
            > 
              {open ? <FaAngleUp/> : <FaAngleDown />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            
          </TableCell>
          <TableCell><Link to={`/dishes/${dish._id}`} state={{dish}}>{dish.name}</Link></TableCell>
          <TableCell>{dish.description}</TableCell>
          <TableCell align='center'><Checkbox onChange={handleCheckboxChange} value={dish._id}  /></TableCell>
        </TableRow>
        <TableRow>
              <TableCell colSpan={3} style={{ paddingBottom: 0, paddingTop: 0, }} >
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{margin: 1}}>
                    <div>
                      <Card>
                        <CardMedia 
                          component='img'
                          height='140'
                          image={process.env.PUBLIC_URL + dish.image}
                          alt={dish.name}
                        />
                      </Card>
                    </div>
                  </Box>

                </Collapse>
              </TableCell>
              <TableCell colSpan={1} style={{ paddingBottom: 0, paddingTop: 0, }} >
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{margin: 1}}> 
                    <div id='ingredient-list'>
                      <h4 className='center underline'>Ingredients:</h4>
                      <List  dense={true}>
                        {dish.ingredients.map((ingredient) => (
                          <ListItem id='ingredient-list' key={ingredient}>{ ingredient }</ListItem>
                        ))}
                      </List>
                    </div>
                  </Box>
                </Collapse>
              </TableCell>
              <TableCell style={{ paddingBOttom: 0, paddingTop: 0}}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{margin:1}}> 
                    <div>
                      <h4 className='underline'>Pairs With:</h4>
                    </div>
                    <List dense={true}>
                    {dish.tags.map((tag) => (
                          <ListItem id='ingredient-list' key={tag}>{ tag }</ListItem>
                        ))}
                    </List>
                  </Box>
                
                </Collapse>

              </TableCell>

        </TableRow>
      </>

  );
}

export default FoodTableItem
