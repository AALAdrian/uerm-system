import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import './App.css'
import mysql from 'mysql'
import Home from './Home';
import Add from './Add'

function App() {

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<Add/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

