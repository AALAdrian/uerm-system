import React, { useEffect } from 'react'
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

    function handleChangePage (event, newPage){
      setPage(newPage);
    };

    function handleChangeRowsPerPage(event){
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    function handleDeleteButton(e){
      const ip = '10.107.10'
      axios.delete(`/api/delete/${ip}`,{
        ip:"10.107.10",
        department: "it"
      })
      .then((res) => {
        console.log(res)
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

      <button>ADD</button>

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
          <TableCell>ip_address</TableCell>
          <TableCell>department</TableCell>
          <TableCell>property_code</TableCell>
          <TableCell>cpu_model</TableCell>
          <TableCell>cpu_serial_no</TableCell>
          <TableCell>remarks</TableCell>
          <TableCell>hostname</TableCell>
          <TableCell>status</TableCell>
          <TableCell>action</TableCell>

        </TableHead>
        <TableBody>
          {/* Render rows based on current page and rowsPerPage */}
          {dummyIpList && dummyIpList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => (
              <TableRow key={row.name}>
                <TableCell >{row.ip_address}</TableCell>
                <TableCell >{row.department}</TableCell>
                <TableCell >{row.property_code}</TableCell>
                <TableCell >{row.cpu_model}</TableCell>
                <TableCell >{row.cpu_serial_no}</TableCell>
                <TableCell >{row.hostname}</TableCell>
                <TableCell >{row.remarks}</TableCell>
                <TableCell >{row.status}</TableCell>
                <TableCell><button onClick={handleEditButton} data-ip={row.ip_address}>edit</button></TableCell>

              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* Table pagination */}
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Paper>

  {/*
  <button onClick={handleEditButton}>
    edit
  </button>

  <button onClick={handleDeleteButton}>
    delete
  </button>

  <button onClick={handleGetDataByIpButton}>
    get data by ip
  </button>
  
  <div>

    <form onSubmit={(e) => e.preventDefault()}>

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

    </form>

  </div>
            */}

</div>

    </div>

    </div>
  )
}

export default Home