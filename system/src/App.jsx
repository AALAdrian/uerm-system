import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  NavLink,
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./App.css";
import mysql from "mysql";
import Home from "./Home";
import Add from "./Add";
import Login from "./Login";
import Admin from "./Admin";
import ProtectedRoute from "./ProtectedRoute";
import Nav from "./component/Nav";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [cookieChecker, setCookieChecker] = useState(false);

  useEffect(() => {
    // Check the initial login status when the app loads
    const initialLoginStatus = localStorage.getItem("loggedIn") === "true";
    setLoginStatus(initialLoginStatus);
  }, []);

  function handleLogoutClick(e) {
    setLoginStatus(false);
    localStorage.setItem("loggedIn", "false");
    axios.get("/api/deleteCookie").then((res) => {
      console.log(res.data);
    });
  }

  //const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  console.log("logged in is ", localStorage.getItem("loggedIn"));

  // useEffect(() => {
  //   axios.get("/api/login").then((response) => {
  //     if (response.data.loggedIn == true) {
  //       //setRole(response.data.user[0].role);
  //       console.log("there is a logged in user", response.data.user);
  //       setLoginStatus(true);
  //       console.log(loginStatus);
  //     } else {
  //       console.log("there is no logged in user");
  //       setLoginStatus(false);
  //       localStorage.setItem("loggedIn", "false");
  //     }
  //   });
  // }, [cookieChecker]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCookieChecker(!cookieChecker);
  //   }, 5000);

  //   return () => {
  //     clearInterval(intervalId); // Clear the interval when the component unmounts
  //   };
  // }, [cookieChecker]);

  return (
    <div className="app-container">
      <BrowserRouter>
        {localStorage.getItem('loggedIn') == 'true' && <Nav setLoginStatus={setLoginStatus} />}
        <Routes>
          {loginStatus ? (
            <Route path="/" element={<Navigate to="/app" />} />
          ) : (
            <Route
              path="/"
              element={<Login setLoginStatus={setLoginStatus} />}
            />
          )}

          <Route element={<ProtectedRoute loginStatus={loginStatus} />}>
            <Route
              path="/app"
              element={
                <Home
                  loginStatus={loginStatus}
                  setLoginStatus={setLoginStatus}
                />
              }
            />
          </Route>

          <Route path="/app/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
