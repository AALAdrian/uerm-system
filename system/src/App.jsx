import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {

  const [ipAddress, setIpAddress] = useState('');
  const [ip, setIp] = useState();
  const [department, setDepartment] = useState();
  const [propCode, setPropCode] = useState();
  const [cpuModel, setCpuModel] = useState();
  const [serialNum, setSerialNum] = useState();
  const [remarks, setRemarks] = useState()
  const [hostname, setHostname] = useState()








  function handleTestButton(){
    console.log('you are clicking the button')
    axios.get('/api/encode').
    then(res => {
      console.log(res)
    }).
    catch(err => {
      console.log(err)
    })
  }

  return (
    <div className='app-container'>

      <label>ip</label>
      <input></input>

      <label>department</label>
      <input></input>

      <label>prop code</label>
      <input></input>

      <label>cpu model</label>
      <input></input>

      <label>cpu serial no</label>
      <input></input>

      <label>remarks</label>
      <input></input>

      <label>hostname</label>
      <input></input>

    </div>
  )
}

export default App

{/*
      <label for='ip-address'>IP ADDRESS</label>
      <input id='ip-address'></input>

      <select>
        <option value="">DEPARTMENT</option>
        <option value="">sample1</option>
        <option value="">sample2</option>
        <option value="">sample3</option>
      </select>

      
  */}