import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import './App.css'
import mysql from 'mysql'
import Home from './Home';
import Add from './Add'
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [loginStatus, setLoginStatus] = useState(false)
  const [cookieChecker, setCookieChecker] = useState(false)
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("/api/login").then((response) => {
      if (response.data.loggedIn == true) {
        //setRole(response.data.user[0].role);
        console.log("there is a logged in user", response.data.user)
        setLoginStatus(true)
      }
      else{
        console.log("there is no logged in user")
        setLoginStatus(false)
      }
    });
  },[cookieChecker]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCookieChecker(!cookieChecker);
    }, 5000);
  
    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  },[cookieChecker]);
 
  
  
  return (
    <div className='app-container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login setLoginStatus={setLoginStatus}/>}/>
          <Route element={<ProtectedRoute loginStatus={loginStatus}/>}>
            <Route path='/app' element={<Home/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

