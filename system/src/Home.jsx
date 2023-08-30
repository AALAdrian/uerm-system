import React, { useEffect } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { useState, useRef } from 'react';
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
    const searchRef = useRef()
    
    useEffect(() => {
      axios.get(`/api/getData/${selectedOption}`)
      .then(res => {
        setIpList(res.data)
        setDummyIpList(res.data)
        if(ipList != null || dummyIpList != null){
            const newIpList = res.data.filter(ip => ip.ip_address.includes(searchRef.current.value))
            setDummyIpList(newIpList)
          }
      })
        
    },[selectedOption])
/*
    useEffect(() => {
         if(ipList){
            
         }
    },[selectedOption])
*/
  
    function handleSearchInputChange(e){
      const newIpList = ipList.filter(ip => ip.ip_address.includes(e.target.value))
      setDummyIpList(newIpList)
    }

  return (
    <div>

<div className='home-container'>
      <form onSubmit={(e) => {
        e.preventDefault()
        const newIpList = ipList.filter(ip => ip.ip_address.includes(searchRef.current.value))
        setDummyIpList(newIpList)
      }}>
      <label>search</label>
      <input type='text' ref={searchRef} value={ipToSearch} onChange={handleSearchInputChange}></input>
      </form>

      

      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value='' defaultValue={true} disabled >departments</option>
        <option value='all'>all</option>
        <option value='engineering'>engineering</option>
        <option value='it'>it</option>
      </select>

      <div className='ip-list'>
        {
          dummyIpList?.map(ip => 
            <div className='ip-address' key={ip.ip_addres}>
              <p>IP: {ip.ip_address}</p>
              <p>Department: {ip.department}</p>
            </div>
          )
        }
      </div>

    </div>

    </div>
  )
}

export default Home