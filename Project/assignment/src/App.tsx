import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/layouts/NavBar';
import Landing from './components/layouts/Landing';
import Dashboard from './components/dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import Favourites from './components/view-favourites/Favourites';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/favourites' element={<Favourites />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>

  );
}

export default App;
