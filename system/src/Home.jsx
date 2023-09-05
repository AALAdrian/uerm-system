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
    const rowsPerPageOptions = [5, 10, 25]; // Options for rows per page
    const defaultRowsPerPage = 5; // Default rows per page
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

    async function handleEditButton(e){

      axios.patch('/api/edit/10.107.5')
      .then(res => {
        console.log(res)
      })
    }

    function handleGetDataByIdButton(e){
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
      <form onSubmit={(e) => {
        e.preventDefault()
        const newIpList = ipList.filter(ip => ip.ip_address.includes(searchRef.current.value))
        setDummyIpList(newIpList)
      }}>
      <label>search</label>
      <input type='text' ref={searchRef} value={ipToSearch} placeholder='search ip address' onChange={handleSearchInputChange}></input>
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
  <button onClick={handleEditButton}>
    edit
  </button>

  <button onClick={handleDeleteButton}>
    delete
  </button>

  <button onClick={handleGetDataByIdButton}>
    get data by ip
  </button>

    </div>

    </div>
  )
}

export default Home