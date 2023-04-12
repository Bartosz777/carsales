import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import { useAuthContext } from './hooks/useAuthContext'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sell from './components/Sell'

import Home from './pages/Home'
import Car from './pages/Car';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={ <Home /> }/>
          <Route path='/sell' element={ user ? <Sell /> : <Navigate to='/login' /> } />
          <Route path='/:id' element={ <Car /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/signup' element={ <Signup /> } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
