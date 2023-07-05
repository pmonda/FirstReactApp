import { useEffect, useState, useContext} from "react";
import { Link, useNavigate, useLocation} from "react-router-dom";
import AddCustomer from "../components/AddCustomer";
import { baseUrl } from "../shared";
import { LoginContext } from "../App";

export default function Customers() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [customers, setCustomers] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  function toggleShow(e) {
    e.preventDefault();
    setShow(!show);
  }

  useEffect(() => {
    fetch("http://localhost:8000/api/customers/", {
      headers: {
        'Content-Type' : 'application/json',
        Authorization  : 'Bearer ' + localStorage.getItem('access'),
      }
    })
      .then((response) => {
        if(response.status === 401) {
            setLoggedIn(false);
            navigate('/login', '/customers');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCustomers(data.customers);
      });
  }, []);
  function newCustomer(name, industry) {
    const data = {name: name, industry : industry}
    const url = baseUrl + '/api/customers/'
    fetch(url, {
        method : 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if(!response.ok) {
            throw new Error('Something went wrong');
        }
        return response.json();
    }).then((data) => {
        toggleShow();
        setCustomers([...customers,data.customer]);
        //make sure list is updated appropriately
    }).catch((e) => {
        console.log(e);
    });
  }
  return (
    <>
      <h1>Here are our customers: </h1>
      <>
        {customers
          ? customers.map((customer) => {
              return (
                <div className="m-2 hover:animate-pulse" key={customer.id}>
                  <Link to={"/customers/" + customer.id}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded no-underline">

                    {customer.name}{" "}
                    </button>
                  </Link>
                </div>
              );
            })
          : null}
      </>
      <AddCustomer newCustomer={newCustomer} show={show} toggleShow={toggleShow}/>
            
    </>
  );
}
