// import { render } from '@testing-library/react';
import './App.css';
import Employee from './components/Employee';
import { useState } from 'react';
import React from 'react';
import {v4 as uuidv4} from 'uuid';
import AddEmployee from './components/AddEmployee';
// import uuidv4 as v4

function App() {
  // const [role,setRole] = useState();
  const [employees,setEmployees] = useState(
    [
      { 
        id: 1,
        name:  "Pranesh", 
        role: "Manager",
        img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      { 
        id: 2,
        name:  "Bob", 
        role: "Developer",
        img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      { 
        id: 3,
        name:  "Jack", 
        role: "Quality Control",
        img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },

      { 
        id: 4,
        name:  "Pranesh", 
        role: "Manager",
        img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      { 
        id:5,
        name:  "Bob", 
        role: "Developer",
        img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      { 
        id:6,
        name:  "Jack", 
        role: "Quality Control",
        img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },

      { 
        id:7,
        name:  "Pranesh", 
        role: "Manager",
        img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      { 
        id:8,
        name:  "Bob", 
        role: "Developer",
        img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      { 
        id:9,
        name:  "Jack", 
        role: "Quality Control",
        img: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
    ]
  );
  console.log('we are about to list the employees');
  function updateEmployee(id, newName, newRole) {
    const updateEmployees = employees.map((employee) => {
      if(id === employee.id) {
        //return new
        return {...employee, name:newName, role:newRole};
      }
      return employee;
    });
    setEmployees(updateEmployees);
  }


  function newEmployee(name, role, img) {
    const newEmp = {
        id: uuidv4(),
        name:  name, 
        role: role,
        img: img
    }
    setEmployees([...employees, newEmp]);
  }
  return (
    <div className="App">
      
      <div className="flex flex-wrap justify-center">
        {
          
          employees.map((employee) => {
            return (<Employee 
              key={employee.id}
              id={employee.id}
              name={employee.name} 
              role={employee.role} 
              img={employee.img}
              updateEmployee={updateEmployee}
              />)
          }) 
        } 
      </div>

      <AddEmployee newEmployee={newEmployee}>
            </AddEmployee>
      
  </div>
  );
}
export default App;
