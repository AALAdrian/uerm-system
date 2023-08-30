import React, { useEffect } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import './App.css'
import mysql from 'mysql'
import './Home.css';

function Home() {
  
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

  return (
    <div>

<div className='home-container'>

      <label>search</label>
      <input type='text' value={ipToSearch} onChange={handleSearchInputChange}></input>

      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="" selected="true" disabled >please select a department</option>
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

    </div>
  )
}

export default Home