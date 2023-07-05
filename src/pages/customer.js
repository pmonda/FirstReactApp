import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";
import { LoginContext } from "../App";
export default function Customer() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [notFound, setNotFound] = useState();
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    if (!customer) return;
    if (!tempCustomer) return;
    let equal = true;
    if (customer.name !== tempCustomer.name) equal = false;
    if (customer.industry !== tempCustomer.industry) equal = false;
    if (equal) setChanged(false);
  });
  useEffect(() => {
    const url = baseUrl + "/api/customers/" + id;
    fetch(url, {
      headers: {
        'Content-Type' : 'application/json',
        Authorization  : 'Bearer ' + localStorage.getItem('access'),
      }
    })
      .then((response) => {
        if (response.status === 404) {
          //redirect to a 404 page
          // navigate('/404');
          //render a 404 component
          setNotFound(true);
        }
        else if(response.status === 401) {
            setLoggedIn(false);
            navigate('/login');
        }

        if (!response.ok) {
          throw new Error("Something went wrong, try again later");
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  function updateCustomer(e) {
    e.preventDefault();
    const url = baseUrl + "/api/customers/" + id;
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
        Authorization  : 'Bearer ' + localStorage.getItem('access'),
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if(response.status === 401) {
          setLoggedIn(false);
          navigate('/login');
        }
        if (!response.ok) throw new Error("something went wrong");
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setChanged(false);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  return (
    <div className="p-3">
      {notFound ? <p>The customer with id {id} was not found</p> : null}
      {customer ? (
        <div className="p-3">
          <form
            className="w-full max-w-sm"
            id="customer"
            onSubmit={updateCustomer}
          >
            <div class="md:flex md:items-center mb-6">
              {/* <p class="m-2 block px-2" type="text">ID: {tempCustomer.id}</p> */}
              <div class="md:w-1/4">
                <label for="name">Name</label>
              </div>
              <div class="md:w-3/4">
                <input
                  id="name"
                  class="m-2 block px-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempCustomer.name}
                  onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({ ...tempCustomer, name: e.target.value });
                  }}
                />
              </div>
            </div>

            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/4">
                <label for="industry">Industry</label>
              </div>
              <div class="md:w-3/4">
                <input
                  id="industry"
                  class="m-2 block px-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempCustomer.industry}
                  onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({
                      ...tempCustomer,
                      industry: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </form>
          {changed ? (
            <div className="flex justify-begin mb-2">
              <button
                className="m-2 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded flex flex-wrap justify-center items-center"
                onClick={() => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
              >
                Cancel
              </button>
              <button className="m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex flex-wrap justify-center items-center" form="customer" onClick={updateCustomer}>
                Save
              </button>
            </div>
          ) : null}
          <div className="mb-2">
          <button
            
            className="m-2 bg-slate-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex flex-wrap justify-center items-center"
            onClick={(e) => {
              const url = baseUrl + "/api/customers/" + id;
              fetch(url, {
                method: "DELETE",
                headers: {
                  'Content-Type' : 'application/json',
                  Authorization  : 'Bearer ' + localStorage.getItem('access'),
                },
              })
                .then((response) => {
                  if(response.status === 401) {
                    setLoggedIn(false);
                    navigate('/login');
                  }
                  if (!response.ok) {
                    throw new Error("something went wrong");
                  }

                  navigate("/customers");
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          >
            Delete
          </button>
          </div>
        </div>
      ) : null}

      {error ? <p>{error}</p> : null}

      <br />
      <Link to="/customers/">
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded no-underline">
          ← Go Back
        </button>
       </Link>
    </div>
  );
}
