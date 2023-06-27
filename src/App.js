import './App.css';
import Employee from './components/Employee'
import { useState } from 'react';

function App() {
  const [role,setRole] = useState();
  console.log('we are about to list the employees');
  const showEmployees = true;
  var result;
  if(showEmployees) {
      result = 
      <>
      <input type='text' onChange={
                  (e) => { 
                    setRole(e.target.value);
        }}/>

        <Employee name="Pranesh" role="Manager"/>
        <Employee name="Bob" role={role}/>
        <Employee />
        <Employee />
        <Employee />
      </>;
  }
  else {
    result = <p>Employees can't be viewed</p>
  }
  return (
    <div className="App">
      {result}
  </div>
  );
}

export default App;
