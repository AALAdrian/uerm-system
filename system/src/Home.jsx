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

      
  <Paper>
    <TableContainer>
      <Table>
        <TableHead>
          {/* Table header content */}
        </TableHead>
        <TableBody>
          {/* Render rows based on current page and rowsPerPage */}
          {ipList?
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.ip_address}</TableCell>
                <TableCell align="right">{row.department}</TableCell>
                <TableCell align="right">{row.property_code}</TableCell>
                <TableCell align="right">{row.cpu_model}</TableCell>
                <TableCell align="right">{row.serial_no}</TableCell>
                <TableCell align="right">{row.hostname}</TableCell>
                <TableCell align="right">{row.remarks}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
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

    </div>

    </div>
  )
}

export default Home