import React, { useDebugValue, useEffect } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { useState, useRef } from 'react';
import axios from 'axios';
import './App.css'
import mysql from 'mysql'
import './Home.css';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import xButton from './assets/x-button.png'

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
    const [page, setPage] = useState(0);
    const rowsPerPageOptions = [5, 10]; // Options for rows per page
    const defaultRowsPerPage = 10; // Default rows per page
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const addPopupRef = useRef();
    const [xToggle, setXToggle] = useState(false);
    const [editToggle, setEditToggle] = useState(false);
    const [dataCount, setDataCount] = useState(1)
    const [forceRender, setForceRender] = useState(0)



    const rows = [
      { name: 'Alice', dsa: 90, maths: 85, dbms: 78, networking: 93 },
      // Add more rows
    ];

    console.log(ipList)
    useEffect(() => {
      axios.get(`/api/getData/${selectedOption}`)
      .then(res => {
        setIpList(res.data)
        setDummyIpList(res.data)
        setDataCount(Object.keys(res.data).length)
        if(ipList != null || dummyIpList != null){
            const newIpList = res.data.filter(ip => ip.ip_address.includes(searchRef.current.value))
            setDummyIpList(newIpList)
            setDataCount(Object.keys(newIpList).length)
          }
      })

    },[selectedOption, forceRender])
/*
    useEffect(() => {
         if(ipList){

         }
    },[selectedOption])
*/

useEffect(() => {
  const addPopup = addPopupRef.current;
  const computedStyle = window.getComputedStyle(addPopup);

  if (xToggle && computedStyle.getPropertyValue('display') !== 'flex') {
    addPopup.style.display = 'flex';
  } else if (!xToggle && computedStyle.getPropertyValue('display') !== 'none') {
    addPopup.style.display = 'none';
  }
}, [xToggle]);

useEffect(() => {

}, [editToggle])


    function handleChangePage (event, newPage){
      setPage(newPage);
    };

    function handleChangeRowsPerPage(event){
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    function handleDeleteButton(e){
      const ip = e.target.dataset.ip;
      axios.delete(`/api/delete/${ip}`)
      .then((res) => {
        console.log(res);
        setForceRender(forceRender + 1);
      })
    }


    function handleSearchInputChange(e){
      const newIpList = ipList.filter(ip => ip.ip_address.includes(e.target.value))
      setDummyIpList(newIpList)
    }

    function handleEditButton(e){
      const ip = e.target.dataset.ip;
      axios.get(`/api/getDataByIp/${ip}`)
      .then(res => {
        const {ip_address, department, property_code, cpu_model, hostname, remarks, cpu_serial_no} = res.data;
        setIp(ip_address);
        setDepartment(department);
        setPropCode(property_code);
        setCpuModel(cpu_model);
        setHostname(hostname);
        setRemarks(remarks);
        setSerialNum(cpu_serial_no);
      })
      .catch(err => {
        console.log(err);
      })
    }

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
          alert(res.data)
          console.log(res.data)
        }
      })
      .catch(err => {
        alert(err)
        console.log(err)
      })
      
    }
    
    /*async function handleEditButton(e){

      axios.patch('/api/edit/10.107.5',{
        ip,department,propCode,cpuModel,serialNum,remarks,hostname
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }*/

    function handleGetDataByIpButton(e){
      axios.get('/api/getDataByIp/10.107.5')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }


    function handleXClick(e){
      setXToggle(!xToggle);
    }

    function handleAddClick(e){
      setXToggle(!xToggle)
    }

  return (
    <div>

<div className='home-container'>

    <div className='left-section'>

      <form onSubmit={(e) => {
        e.preventDefault()
        const newIpList = ipList.filter(ip => ip.ip_address.includes(searchRef.current.value))
        setDummyIpList(newIpList)
      }}>

      <input type='text' ref={searchRef} value={ipToSearch} placeholder='Search IP Address' onChange={handleSearchInputChange}></input>

      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value='' defaultValue={true} disabled >departments</option>
        <option value='all'>all</option>
        <option value='engineering'>engineering</option>
        <option value='it'>it</option>
      </select>

      <button onClick={handleAddClick}>ADD</button>

      </form>

      

    </div>

    <div className='right-section'>
      {/*
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
      */}

      
  <Paper>
    <TableContainer>
      <Table>
        <TableHead>
          {/* Table header content */}
          <TableCell align='center'>Ip Address</TableCell>
          <TableCell align='center'>Department</TableCell>
          <TableCell align='center'>Property Code</TableCell>
          <TableCell align='center'>Cpu Model</TableCell>
          <TableCell align='center'>Cpu Serial Num</TableCell>
          <TableCell align='center'>Remarks</TableCell>
          <TableCell align='center'>Hostname</TableCell>
          <TableCell align='center'>Status</TableCell>
          <TableCell align='center'>Action</TableCell>

        </TableHead>
        <TableBody>
          {/* Render rows based on current page and rowsPerPage */}
          {dummyIpList && dummyIpList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => (
              <TableRow key={row.name}>
                <TableCell align='center'>{row.ip_address}</TableCell>
                <TableCell align='center'>{row.department}</TableCell>
                <TableCell align='center'>{row.property_code}</TableCell>
                <TableCell align='center'>{row.cpu_model}</TableCell>
                <TableCell align='center'>{row.cpu_serial_no}</TableCell>
                <TableCell align='center'>{row.hostname}</TableCell>
                <TableCell align='center'>{row.remarks}</TableCell>
                <TableCell align='center'>{row.status}</TableCell>
                <TableCell align='center'>
                  <div className='edit-delete-container'>
                    <button onClick={handleEditButton} data-ip={row.ip_address} className='edit-button'>Edit</button>
                    <button className='delete-button' data-ip={row.ip_address} onClick={handleDeleteButton}>Delete</button>
                  </div>
                </TableCell>

              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* Table pagination */}
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={dataCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Paper>

  
  <div className='edit-popup-container'>

    <form onSubmit={(e) => e.preventDefault()} >

    <label>ip address</label>
    <input type='text' value={ip} onChange={(e) => setIp(e.target.value)}></input>

    <label>department</label>
    <input type='text' value={department} onChange={(e) => setDepartment(e.target.value)}></input>

    <label>property_code</label>
    <input type='text' value={propCode} onChange={(e) => setPropCode(e.target.value)}></input>   

    <label>cpu_model</label>
    <input type='text' value={cpuModel} onChange={(e) => setCpuModel(e.target.value)}></input>  

    <label>cpu_serial_no</label>
    <input type='text' value={serialNum} onChange={(e) => setSerialNum(e.target.value)}></input>   

    <label>remarks</label>
    <input type='text' value={remarks} onChange={(e) => setRemarks(e.target.value)}></input>

    <label>hostname</label>
    <input type='text' value={hostname} onChange={(e) => setHostname(e.target.value)}></input>

    <button type='submit'>submit</button>

    <img src={xButton} className='x-button' onClick={}></img>

    </form>

  </div>
            

<div className='add-container' ref={addPopupRef}>
  <form className='add-popup-container'>         
    <label>Ip Address</label>
    <input value={ip} onChange={(e) => setIp(e.target.value)}></input>

    <label>Department</label>
    <input value={department} onChange={(e) => setDepartment(e.target.value)}></input>

    <label>Property Code</label>
    <input value={propCode} onChange={(e) => setPropCode(e.target.value)}></input>

    <label>Cpu Model</label>
    <input value={cpuModel} onChange={(e) => setCpuModel(e.target.value)}></input>

    <label>Cpu Serial Number</label>
    <input value={serialNum} onChange={(e) => setSerialNum(e.target.value)}></input>

    <label>Remarks</label>
    <input value={remarks} onChange={(e) => setRemarks(e.target.value)}></input>

    <label>Hostname</label>
    <input value={hostname} onChange={(e) => setHostname(e.target.value)}></input>

    <button onClick={handleSubmit}>Submit</button>
    <br></br><br></br>

     <img src={xButton} className='x-button' onClick={handleXClick}></img>       
  </form>          
</div>

</div>

    </div>

    </div>
  )
}

export default Home