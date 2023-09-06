import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import './Add.css'

function Add() {

    const [ip, setIp] = useState();
    const [department, setDepartment] = useState();
    const [propCode, setPropCode] = useState();
    const [cpuModel, setCpuModel] = useState();
    const [serialNum, setSerialNum] = useState();
    const [remarks, setRemarks] = useState();
    const [hostname, setHostname] = useState();

    function handleSubmit(){

        axios.post('/api/add', 
        {
          ip, department, propCode, cpuModel, serialNum, remarks, hostname
        }
        ).then(res => {
          if(res.data.error){
            alert(res.data.error)
            console.log(res.data.error)
          }
          if(res.data.err){
            console.log(res.data.err)
          }
          else{
            console.log(res.data)
          }
        })
        .catch(err => {
          alert(err)
          console.log(err)
        })
        
      }

  return (
    <div className='add-container'>

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
      

    </div>
  )
}

export default Add