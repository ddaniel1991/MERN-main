import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import Food from './pages/Food'
import Drink from './pages/Drink'
import DisplayFood from './components/dishes/DisplayFood'
import DisplayDrink from './components/drinks/DisplayDrink'
import AddFoodItemForm from './components/admin/AddFoodItemForm'
import AddDrinkItemForm from './components/admin/AddDrinktemForm'
import './index.css';
import ConfirmDelete from './components/admin/ConfirmDelete'
import ConfirmDrinkDelete from './components/admin/ConfirmDrinkDelete'
import FlashCard from './components/flashcard/FlashCard'
import ImageUpload from './components/admin/ImageUpload'
import env from 'react-dotenv'


function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path='/' element={<Dashboard />} />
        {/* Auth Routes   */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        {/* Dish Routes */}
            <Route path='/dishes' element={<Food/>} />
              <Route path='/dishes/add' element={<AddFoodItemForm />} />
              <Route path='/dishes/:id' element={<DisplayFood />} />
              <Route path='/dishes/:id/edit' />
              <Route path='/dishes/:id/confirm-delete' element={<ConfirmDelete />} />
        {/* Drink Routes */}
            <Route path='/drinks' element={<Drink />} />
              <Route path='/drinks/add' element={<AddDrinkItemForm />} />
              <Route path='/drinks/:id' element={<DisplayDrink />} />
              <Route path='/drinks/:id/edit' />
              <Route path='/drinks/:id/confirm-delete' element={<ConfirmDrinkDelete />} />
          {/* Quiz Routes */}
            <Route path='/quiz' element={<FlashCard />} />
            <Route path='/test' element={<ImageUpload />} />
          </Routes>

        </div>
      </Router>  
      <ToastContainer />
    </>
  );
}

export default App;
