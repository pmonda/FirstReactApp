// import { render } from '@testing-library/react';
import './App.css';
import Employee from './components/Employee';
import { useState } from 'react';
import React from 'react';
import {v4 as uuidv4} from 'uuid';
import AddEmployee from './components/AddEmployee';
import Header from './components/Header';
import Employees from './pages/Employees';
import Customers from './pages/Customers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import uuidv4 as v4

function App() {
  return(
      <BrowserRouter>
        <Header>

      <Routes>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/customers' element={<Customers/>}/>
      </Routes>
      </Header>

      </BrowserRouter>

  );
}

export default App;
