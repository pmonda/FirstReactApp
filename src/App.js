// import { render } from '@testing-library/react';
import './App.css';
import Employee from './components/Employee';
import { createContext, useEffect, useState } from 'react';
import React from 'react';
import {v4 as uuidv4} from 'uuid';
import AddEmployee from './components/AddEmployee';
import Header from './components/Header';
import Employees from './pages/Employees';
import Customers from './pages/Customers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dictionary from './pages/Dictionary';
import Definition from './pages/Definition';
import NotFound from './components/NotFound';
import Customer from './pages/customer';
import Login from './pages/Login';
import { baseUrl } from './shared';
import Register from './pages/Register';
// import uuidv4 as v4

export const LoginContext = createContext();
function App() {
  
  useEffect(() => {
    const minute = 1000*60;
    function refreshToken(){
      if(localStorage.refresh) {
        const url = baseUrl + 'api/token/refresh/';
      fetch(url,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refresh: localStorage.refresh,
        })
      }).then((response) => {
        return response.json();
       }).then((data) => {
        console.log(data);
        localStorage.access = data.acess;
        localStorage.refresh = data.refresh;
        setLoggedIn(true);
      });
      }
    }

    
    setInterval(refreshToken,minute);
  }, []);

  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);
  function changeLoggedIn(value) {
    if(value === false) {
      localStorage.clear();
    }
  }
  return(
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Header>

      <Routes>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/dictionary' element={<Dictionary/>}/>
        <Route 
        path='/dictionary/:search' 
        element={<Definition/>}
        />
        <Route path='/customers' element={<Customers/>}/>
        <Route path='/customers/:id' element={<Customer/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/404' element={<NotFound/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </Header>

      </BrowserRouter>
      </LoginContext.Provider>
  );
}

export default App;
