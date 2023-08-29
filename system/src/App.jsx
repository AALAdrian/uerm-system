import React, { useEffect } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import './App.css'
import mysql from 'mysql'

function App() {

  const [ipAddress, setIpAddress] = useState('');
  const [ip, setIp] = useState();
  const [department, setDepartment] = useState();
  const [propCode, setPropCode] = useState();
  const [cpuModel, setCpuModel] = useState();
  const [serialNum, setSerialNum] = useState();
  const [remarks, setRemarks] = useState()
  const [hostname, setHostname] = useState()
  const [ipToSearch, setIpToSearch] = useState();
  const [ipList, setIpList] = useState()
  const [dummyIpList, setDummyIpList] = useState();
  const [selectedOption, setSelectedOption] = useState()
  
  useEffect(() => {
    axios.get(`/api/getData/${selectedOption}`)
    .then(res => {
      console.log(res.data)
      setIpList(res.data)
      setDummyIpList(res.data)
    })
  },[selectedOption])

  function handleSearchInputChange(e){
    const newIpList = ipList.filter(ip => ip.ip_address.includes(e.target.value))
    setDummyIpList(newIpList)
  }


  function handleSubmit(){
    axios.post('/api/add', 
    {
      ip, department, propCode, cpuModel, serialNum, remarks, hostname
    }
    ).then(res => {
      if(res.data.error){
        console.log(res.data.error)
      }
      else{
        console.log(res.data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }



  return (
    <div className='app-container'>

      <label>ip</label>
      <input value={ip} onChange={(e) => setIp(e.target.value)}></input>

      <label>department</label>
      <input value={department} onChange={(e) => setDepartment(e.target.value)}></input>

      <label>prop code</label>
      <input value={propCode} onChange={(e) => setPropCode(e.target.value)}></input>

      <label>cpu model</label>
      <input value={cpuModel} onChange={(e) => setCpuModel(e.target.value)}></input>

      <label>cpu serial no</label>
      <input value={serialNum} onChange={(e) => setSerialNum(e.target.value)}></input>

      <label>remarks</label>
      <input value={remarks} onChange={(e) => setRemarks(e.target.value)}></input>

      <label>hostname</label>
      <input value={hostname} onChange={(e) => setHostname(e.target.value)}></input>

      <button onClick={handleSubmit}>submit</button>
      <br></br><br></br>
      <label>search</label>
      <input type='text' value={ipToSearch} onChange={handleSearchInputChange}></input>

      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value=''>please select a department</option>
        <option value='engineering'>engineering</option>
        <option value='it'>it</option>
      </select>

      <div className='ip-list'>
        {
          dummyIpList?.map(ip => 
            <div className='ip-address' key={ip.ip_addres}>
              <p>IP: {ip.ip_address}</p>
            </div>
          )
        }
      </div>

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