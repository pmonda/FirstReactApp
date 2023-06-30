// import { render } from '@testing-library/react';
import './App.css';
import Employee from './components/Employee';
import { useState } from 'react';
import React from 'react';
import {v4 as uuidv4} from 'uuid';
import AddEmployee from './components/AddEmployee';
import Header from './components/Header';
import Employees from './pages/Employees';
// import uuidv4 as v4

function App() {
  return(
  <Header>
      <Employees/>

  </Header>
  );
}

export default App;
