import { useState, useEffect, useContext } from "react";
import { baseUrl } from "../shared";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
export default function Register() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    setLoggedIn(false);
  });
  
  useEffect(() => {});
  function login(e) {
    e.preventDefault();
    const url = baseUrl + "api/register/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setLoggedIn(true);
        navigate(
          location?.state?.prevURL ? location.state.prevURL : "/customers"
        );
      });
  }
  return (
    <form className="m-2 w-full max-w-sm" id="customer" onSubmit={login}>
      <div class="md:flex md:items-center mb-6">
        {/* <p class="m-2 block px-2" type="text">ID: {tempCustomer.id}</p> */}
        <div class="md:w-1/4">
          <label for="email">Email</label>
        </div>
        <div class="md:w-3/4">
          <input
            id="username"
            class="m-2 block px-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>

      <div class="md:flex md:items-center mb-6">
        {/* <p class="m-2 block px-2" type="text">ID: {tempCustomer.id}</p> */}
        <div class="md:w-1/4">
          <label for="username">Username</label>
        </div>
        <div class="md:w-3/4">
          <input
            id="username"
            class="m-2 block px-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
      </div>

      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/4">
          <label for="password">Password</label>
        </div>
        <div class="md:w-3/4">
          <input
            id="password"
            type="password"
            class="m-2 block px-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <button className="m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex flex-wrap justify-center items-center">
        Register
      </button>
    </form>
  );
}
