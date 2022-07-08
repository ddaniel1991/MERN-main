import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { Navbar, NavbarBrand, NavLink, Nav, Container} from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'
import { MdRestaurant } from 'react-icons/md'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }


  return (
    
    <div>
      <header className='header'>
        <div>
          <Navbar bg='light' variant='light' expand='lg' fixed='top'>
            <Container>
              <Navbar.Toggle  aria-controls="basic-navbar-nav"><FaBars /></Navbar.Toggle> 

              <NavbarBrand href='/'><MdRestaurant /></NavbarBrand>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className='me-auto'>
            
                  <NavLink href='/'> Home </NavLink>
                  {user ?
                  <>
        
                  <NavLink href='/dishes/'> Dishes </NavLink>
            
                  <NavLink href='/drinks/'> Drinks </NavLink>
                          
                  <NavLink disabled href='/quiz'> Quiz </NavLink>
                  </>

                  : null
                  }

                </Nav>    
              </Navbar.Collapse>  

              <Nav>
                  {user ? (         
                  <>
                      <button className='btn dflex flex-row-reverse' onClick={onLogout}>
                          <FaSignOutAlt />Logout
                      </button>
                  </> 
                  ) : (
                  <> 
                      <>
                        <NavLink className='dflex flex-row-reverse' href='/login'>
                            <FaSignInAlt />Login
                        </NavLink>
                      </>   
                      <>
                        <NavLink className='dflex flex-row-reverse' href='/register'>
                            <FaUser />Register
                        </NavLink>
                      </>
                  </>)
                  }
                        
              </Nav>
            </Container>    
          </Navbar>
        </div>

      </header>
    </div>
  )
}

export default Header
