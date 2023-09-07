import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import './App.css'
import mysql from 'mysql'
import Home from './Home';
import Add from './Add'
import Login from './Login';

function App() {

  
  return (
    <div className='app-container'>
    <BrowserRouter>
      <Routes>
        <Route path='/app' element={<Home/>}/>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App

