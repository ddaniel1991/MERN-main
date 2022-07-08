import React, {useState, useEffect} from 'react'
import {  Container } from 'react-bootstrap'
import { FormControl, Button, TextField,FormControlLabel, FormGroup, Checkbox } from '@mui/material'
import { Box } from '@mui/system'
import ReactTagInput from '@pathofdev/react-tag-input'
import { useDispatch, useSelector} from 'react-redux'
import {createDish} from '../../features/dishes/dishSlice'
import { toast } from 'react-toastify'
import ImageUpload from './ImageUpload'
import { useNavigate } from 'react-router-dom'


const AddFoodItemForm = () => {
    const {user} = useSelector((state) => state.auth)
    const { dishes, isLoading, isError, isSuccess, message } = useSelector((state) => state.dishes)
    
    //default state for checkboxes
    const defaultChecked = {
      dairy: false,
      gluten: false,
      nuts: false,
      soy: false,
      shellfish: false,
      eggs: false,
    }

    //setting default state for form
    const defaultValues = {
        name: "",
        description: "",
        tags: [],
        ingredients: [],
        allergens: [],
        image: "",
    };

    //initializing states for form and object values
    const [formValues,setFormValues] = useState(defaultValues);
    const [tags, setTags] = useState([])
    const [ingredients,setIngredients] = useState([]) 
    const [allergens, setAllergens] = useState([])
     
    //initializing states for checkboxes
    const [checked, setChecked] = useState(defaultChecked);
    const {dairy, gluten, nuts, soy, shellfish, eggs} = checked

    //initializing hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //function that retrieves url for dish image
    // gets passed into ImageUpload component
    const updateImageUrl = (imageUrl) => {
      formValues.image = imageUrl
      console.log(formValues)
    }


    // updates form values upon user input 
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        console.log(formValues)

    };

    //handle checkbox fields
    const handleCheckboxChange = (e) => {
      //changes state of each checkbox
      setChecked({
        ...checked,
        [e.target.name]: e.target.checked,
      });
      //updating allergens variable to reflect current state of checkboxes
      //checks to see whether the value is already in the array
      // functions as a toggle
      if(allergens.includes(e.target.value)) {
        const index = allergens.indexOf(e.target.value)
        allergens.splice(index, 1)
      }
      else {
        allergens.push(e.target.value)
      }

      //updating the formvalues for submission
      formValues.allergens = allergens
    }
    
    // handle tag fields
    const handleTagAddition = (tags) => {
            formValues.tags = tags;
    }
    // handle ingredient tags
    const handleIngredientAddition = (ingredients) => {
        formValues.ingredients = ingredients;
    }


    // handle form submission
    const onSubmit = (e) => {
            e.preventDefault()
            dispatch(createDish(formValues))
            setFormValues(defaultValues)
            setIngredients([])
            setTags([])
            setAllergens([])
            setChecked(defaultChecked)
    }
    

    useEffect(() => {
      if(!user) {
        navigate('/login')
      }
      if(isError) {
          console.log(message);
          toast.error(message)
      }
      if(isSuccess) {
        toast.success("Dish Created Successfully!")
      }
        
       
  
    }, [user, navigate, isError, isSuccess, message])

  return (
    <div>
      <Container>
          <Box sx={{
              width: 600,
              maxWidth: '100%',
              mx: 'auto'
          }} >
            <form onSubmit={onSubmit}>
                <h3>Please Complete All Fields</h3>
                
                  <FormControl margin='normal' fullWidth>
                    <h4>Dish Name:</h4>

                    <TextField 
                        variant='outlined'
                        id='dishName' 
                        name='name'
                        label='Name:'
                        placeholder='Enter Text Here' 
                        value={formValues.name}
                        onChange={handleInputChange}
                    />
                     <FormControl fullWidth>
                    <h4>Image</h4>
                    <ImageUpload updateImageUrl={updateImageUrl} />
                  </FormControl>
                  </FormControl>  
                  <FormControl margin='normal' fullWidth>
                    <h4>Description:</h4>
                    <TextField
                        id='description'
                        variant='outlined'
                        name='description'
                        label='Description'
                        placeholder='Enter Text Here'
                        value={formValues.description}
                        onChange={handleInputChange}
                        multiline
                        rows={3}
                    />
                  </FormControl>  
                  <FormControl fullWidth>
                    <h4>Ingredients:</h4>
                    <ReactTagInput 
                        tags={ingredients}
                        value={formValues.ingredients}
                        onChange={ (newIngredients) => setIngredients(newIngredients)}
                        handleaddition={handleIngredientAddition(ingredients)}
                        removeOnBackspace={true}
                        margin='normal'
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <h4>Flavor Profile:</h4>
                    <ReactTagInput 
                        tags={tags}
                        value={formValues.tags}
                        onChange={ (newTags) => setTags(newTags)}
                        handleaddition={handleTagAddition(tags)}
                        removeOnBackspace={true}
                        margin='normal'
                    />
                  </FormControl>  
                  <div className='container'>
                    <h4>Allergens:</h4>
                    </div>
                  <FormControl component='fieldset' variant='standard' >
                    
                    <div>
                   <FormGroup>
                     <FormControlLabel control=
                        {
                          <Checkbox checked={dairy} onChange={handleCheckboxChange} value='dairy' name='dairy'/>
                        }   label="Dairy" />
                     <FormControlLabel control=
                        {
                          <Checkbox checked={gluten} onChange={handleCheckboxChange} value='gluten' name='gluten'/>
                        }  label="Gluten" />
                     <FormControlLabel control=
                        {
                          <Checkbox checked={nuts} onChange={handleCheckboxChange} value='nuts' name='nuts'/>
                        }  label="Nuts" />
                   </FormGroup>
                   </div>
                  </FormControl>
                  <FormControl component='fieldset' variant='standard'>
                    <div>
                    <FormGroup>
                     <FormControlLabel control=
                        {
                          <Checkbox checked={soy} onChange={handleCheckboxChange} value='soy' name='soy' />
                        }   label="Soy" />
                     <FormControlLabel control=
                        {
                          <Checkbox checked={shellfish} onChange={handleCheckboxChange} value='shellfish' name='shellfish'/>
                        }  label="Shellfish" />
                     <FormControlLabel control=
                        {
                          <Checkbox checked={eggs} onChange={handleCheckboxChange} value='eggs' name='eggs' />
                        }  label="Eggs" />
                   </FormGroup>
                   </div>
                  </FormControl>  
                 
                  <FormControl margin='normal' fullWidth>
                    
                    <Button 
                        variant='contained'
                        color='success'
                        type='submit'
                        onSubmit={onSubmit}
                    > Submit </Button>
                  </FormControl>  
            </form>      
          </Box>
      </Container>
    </div>
  )
}

export default AddFoodItemForm
