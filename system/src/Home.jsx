import React, { useDebugValue, useEffect } from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import mysql from "mysql";
import "./Home.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import xButton from "./assets/x-button.png";
import { internalIpV6, internalIpV4 } from "internal-ip";
import os from "os";
import useStore from "./globalStore";

function Home({ loginStatus, setLoginStatus }) {
  const [ipAddress, setIpAddress] = useState("");
  const [ip, setIp] = useState();
  const [department, setDepartment] = useState();
  const [propCode, setPropCode] = useState();
  const [cpuModel, setCpuModel] = useState();
  const [serialNum, setSerialNum] = useState();
  const [remarks, setRemarks] = useState();
  const [hostname, setHostname] = useState();
  const [ipToSearch, setIpToSearch] = useState();
  const [ipList, setIpList] = useState();
  const [dummyIpList, setDummyIpList] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const searchRef = useRef();
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [5, 10]; // Options for rows per page
  const defaultRowsPerPage = 10; // Default rows per page
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const addPopupRef = useRef();
  const [xToggle, setXToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [dataCount, setDataCount] = useState(1);
  const [forceRender, setForceRender] = useState(0);
  const editPopupRef = useRef();
  const [selectedIp, setSelectedIp] = useState();
  const deletePopupRef = useRef();
  const [deletePopupToggle, setDeletePopupToggle] = useState(false);
  const role = useStore((state) => state.role);
  const [checkBoxes, setCheckBoxes] = useState([]);
  const [refreshStatus, setRefreshStatus] = useState(0);
  const refreshStatusRef = useRef(false);
  const [refreshStatus2, setRefreshStatus2] = useState(0);
  const isSecondUseEffectRunning = useRef();

  async function setStatus() {
    const { data } = await axios.get(`/api/getData/${selectedOption}`);
    console.log(data);
    const startIndex = page * rowsPerPage;
    const endIndex =
      startIndex + Math.min(rowsPerPage, data?.length - startIndex);

    const requests = data
      ?.slice(startIndex, endIndex)
      .map((item) => axios.get(`/api/getStatus/${item?.ip_address}`));
    console.log(requests);

    Promise.all(requests)
      .then((responses) => {
        // Process responses here if needed
        console.log(responses[0]?.data);
        setForceRender(forceRender + 1);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    //window.location.href = window.location.href + 'app'\
    console.log(localStorage.getItem("role"));
  }, []);

  //call api and ping the api on the backend and set the status .
  useEffect(() => {
    setStatus();
  }, [refreshStatus, rowsPerPage, page]);

  useEffect(() => {
    console.log("the first useeffect runs");
    axios.get(`/api/getData/${selectedOption}`).then((res) => {
      setIpList(res.data);
      setDummyIpList(res.data);
      const startIndex = page * rowsPerPage;

      setDataCount(Object.keys(res.data).length);
      if (ipList != null || dummyIpList != null) {
        const newIpList = res.data.filter((ip) =>
          ip.ip_address.includes(searchRef.current.value)
        );
        setDummyIpList(newIpList);
        setDataCount(Object.keys(newIpList).length);
      }
    });
    console.log("i passed the axios.get inside the first use effect");
  }, [refreshStatus, selectedOption, forceRender]);

  useEffect(() => {
    const addPopup = addPopupRef.current;
    const addcomputedStyle = window.getComputedStyle(addPopup);

    if (xToggle && addcomputedStyle.getPropertyValue("display") !== "flex") {
      addPopup.style.display = "flex";
    } else if (
      !xToggle &&
      addcomputedStyle.getPropertyValue("display") !== "none"
    ) {
      setIp("");
      setDepartment("");
      setPropCode("");
      setCpuModel("");
      setHostname("");
      setRemarks("");
      setSerialNum("");
      addPopup.style.display = "none";
    }
  }, [xToggle]);

  useEffect(() => {
    const editPopup = editPopupRef.current;
    const editcomputedStyle = window.getComputedStyle(editPopup);

    if (
      editToggle &&
      editcomputedStyle.getPropertyValue("display") !== "flex"
    ) {
      editPopup.style.display = "flex";
    } else if (
      !editToggle &&
      editcomputedStyle.getPropertyValue("display") !== "none"
    ) {
      setIp("");
      setDepartment("");
      setPropCode("");
      setCpuModel("");
      setHostname("");
      setRemarks("");
      setSerialNum("");
      setSelectedIp("");
      editPopup.style.display = "none";
    }
  }, [editToggle]);

  useEffect(() => {
    const deletePopup = deletePopupRef.current;
    const deletecomputedStyle = window.getComputedStyle(deletePopup);

    if (
      deletePopupToggle &&
      deletecomputedStyle.getPropertyValue("display") !== "flex"
    ) {
      deletePopup.style.display = "flex";
    } else if (
      !deletePopupToggle &&
      deletecomputedStyle.getPropertyValue("display") !== "none"
    ) {
      setIp("");
      setDepartment("");
      setPropCode("");
      setCpuModel("");
      setHostname("");
      setRemarks("");
      setSerialNum("");
      setSelectedIp("");
      deletePopup.style.display = "none";
    }
  }, [deletePopupToggle]);

  // useEffect(() => {
  //   setRefreshStatus((prev) => prev + 1);
  // });

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function handleDeleteButton(e) {
    //const ip = e.target.dataset.ip;
    axios.delete(`/api/delete/${selectedIp}`).then((res) => {
      console.log(res);
      setDeletePopupToggle(!deletePopupToggle);
      setForceRender(forceRender + 1);
      if (checkBoxes.includes(selectedIp)) {
        setCheckBoxes(checkBoxes.filter((ip) => ip != selectedIp));
      }
    });
  }

  function handleSearchInputChange(e) {
    const newIpList = ipList.filter((ip) =>
      ip.ip_address.includes(e.target.value)
    );
    setDummyIpList(newIpList);
  }

  function handleEditButton(e) {
    const ip = e.target.dataset.ip;
    axios
      .get(`/api/getDataByIp/${ip}`)
      .then((res) => {
        const {
          ip_address,
          department,
          property_code,
          cpu_model,
          hostname,
          remarks,
          cpu_serial_no,
        } = res.data;
        setIp(ip_address);
        setDepartment(department);
        setPropCode(property_code);
        setCpuModel(cpu_model);
        setHostname(hostname);
        setRemarks(remarks);
        setSerialNum(cpu_serial_no);
        setEditToggle(!editToggle);
        setSelectedIp(e.target.dataset.ip);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditSubmit(e) {
    axios
      .patch(`/api/edit/${selectedIp}`, {
        ip_address: ip,
        department,
        property_code: propCode,
        cpu_model: cpuModel,
        cpu_serial_no: serialNum,
        remarks,
        hostname,
      })
      .then((res) => {
        setEditToggle(!editToggle);
        setRefreshStatus(refreshStatus + 1);
      })
      .catch((err) => {
        console.log(err);
        setEditToggle(!editToggle);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("/api/add", {
        ip,
        department,
        propCode,
        cpuModel,
        serialNum,
        remarks,
        hostname,
      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
          console.log(res.data.error);
        }
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          alert(res.data);
          console.log(res.data);
          setXToggle(!xToggle);
          setForceRender(forceRender + 1);
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }

  /*async function handleEditButton(e){

      
    }*/

  function handleGetDataByIpButton(e) {
    axios
      .get("/api/getDataByIp/10.107.5")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleXClick(e) {
    setXToggle(!xToggle);
  }

  function handleAddClick(e) {
    setXToggle(!xToggle);
  }

  function handleLogoutClick(e) {
    setLoginStatus(false);
    localStorage.setItem("loggedIn", "false");
    axios.get("/api/deleteCookie").then((res) => {
      console.log(res.data);
    });
  }

  function handleCheckBoxClick(ip) {
    if (checkBoxes.includes(ip)) {
      const index = checkBoxes.indexOf(ip);
      console.log(checkBoxes.indexOf(ip));
      setCheckBoxes(checkBoxes.filter((ip2) => ip != ip2));
    } else {
      setCheckBoxes([...checkBoxes, ip]);
      console.log(checkBoxes);
    }
  }

  function handleMultiSelectDelete() {
    for (let i = 0; i < checkBoxes.length; i++) {
      axios
        .delete(`/api/delete/${checkBoxes[i]}`)
        .then((res) => {
          console.log(res);
          setForceRender(forceRender + 1);
          setCheckBoxes([]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div>
      <div className="home-container">
        <div className="left-right-section-container">
          <div className="left-section">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newIpList = ipList.filter((ip) =>
                  ip.ip_address.includes(searchRef.current.value)
                );
                setDummyIpList(newIpList);
              }}
            >
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="" defaultValue={true} disabled>
                  departments
                </option>
                <option value="all">all</option>
                <option value="engineering">engineering</option>
                <option value="it">it</option>
              </select>

              <button onClick={handleAddClick}>ADD</button>
            </form>
          </div>

          <div className="right-section">
            <i class="fa fa-search" aria-hidden="true"></i>
            <input
              className="search-input"
              type="text"
              ref={searchRef}
              value={ipToSearch}
              placeholder="Search IP Address"
              onChange={handleSearchInputChange}
            />

            <Paper>
              <TableContainer>
                <Table>
                  <TableHead>
                    {/* Table header content */}
                    <TableCell align="center">
                      {checkBoxes.length > 0 && (
                        <i
                          class="fa fa-trash"
                          aria-hidden="true"
                          onClick={handleMultiSelectDelete}
                        ></i>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      Status
                      <i class="fa fa-refresh" aria-hidden="true"></i>
                    </TableCell>
                    <TableCell align="center">Ip Address</TableCell>
                    <TableCell align="center">Department</TableCell>
                    <TableCell align="center">Property Code</TableCell>
                    <TableCell align="center">Cpu Model</TableCell>
                    <TableCell align="center">Cpu Serial Num</TableCell>
                    <TableCell align="center">Remarks</TableCell>
                    <TableCell align="center">Hostname</TableCell>

                    <TableCell align="center">Action</TableCell>
                  </TableHead>
                  <TableBody>
                    {/* Render rows based on current page and rowsPerPage */}
                    {dummyIpList &&
                      dummyIpList
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => (
                          <TableRow
                            className="tableRow"
                            key={row.ip_address}
                            on={() => alert("this is a row in a table")}
                          >
                            <TableCell align="center">
                              <input
                                type="checkbox"
                                data-ip={row.ip_address}
                                onChange={(e) =>
                                  handleCheckBoxClick(row.ip_address)
                                }
                              />
                            </TableCell>
                            <TableCell align="center">
                              <i
                                className={`fa fa-circle ${
                                  row?.status == "on"
                                    ? "on"
                                    : row.status == "off"
                                    ? "off"
                                    : "off"
                                }`}
                              ></i>
                            </TableCell>
                            <TableCell align="center">
                              {row.ip_address}
                            </TableCell>
                            <TableCell align="center">
                              {row.department}
                            </TableCell>
                            <TableCell align="center">
                              {row.property_code}
                            </TableCell>
                            <TableCell align="center">
                              {row.cpu_model}
                            </TableCell>
                            <TableCell align="center">
                              {row.cpu_serial_no}
                            </TableCell>
                            <TableCell align="center">{row.remarks}</TableCell>
                            <TableCell align="center">{row.hostname}</TableCell>

                            <TableCell align="center">
                              <div className="edit-delete-container">
                                <i
                                  class="fa fa-pencil"
                                  aria-hidden="true"
                                  onClick={handleEditButton}
                                  data-ip={row.ip_address}
                                ></i>
                                <i
                                  class="fa fa-trash"
                                  aria-hidden="true"
                                  data-ip={row.ip_address}
                                  onClick={(e) => {
                                    setDeletePopupToggle(!deletePopupToggle);
                                    setSelectedIp(e.target.dataset.ip);
                                  }}
                                ></i>
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

            <div className="edit-popup-container" ref={editPopupRef}>
              <form onSubmit={(e) => e.preventDefault()}>
                <h2>Edit</h2>

                <label>ip address</label>
                <input
                  type="text"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                ></input>

                <label>department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                ></input>

                <label>property_code</label>
                <input
                  type="text"
                  value={propCode}
                  onChange={(e) => setPropCode(e.target.value)}
                ></input>

                <label>cpu_model</label>
                <input
                  type="text"
                  value={cpuModel}
                  onChange={(e) => setCpuModel(e.target.value)}
                ></input>

                <label>cpu_serial_no</label>
                <input
                  type="text"
                  value={serialNum}
                  onChange={(e) => setSerialNum(e.target.value)}
                ></input>

                <label>remarks</label>
                <input
                  type="text"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                ></input>

                <label>hostname</label>
                <input
                  type="text"
                  value={hostname}
                  onChange={(e) => setHostname(e.target.value)}
                ></input>

                <button type="submit" onClick={handleEditSubmit}>
                  Submit
                </button>

                <img
                  src={xButton}
                  className="x-button"
                  onClick={(e) => setEditToggle(!editToggle)}
                ></img>
              </form>
            </div>
          </div>

          <div className="add-container" ref={addPopupRef}>
            <form className="add-popup-container" onSubmit={handleSubmit}>
              <label>Ip Address</label>
              <input
                value={ip}
                placeholder="xxx.xxx.xxx.xxx"
                required
                onChange={(e) => setIp(e.target.value)}
              ></input>

              <label>Department</label>
              <input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="department"
              ></input>

              <label>Property Code</label>
              <input
                value={propCode}
                required
                onChange={(e) => setPropCode(e.target.value)}
                placeholder="property code"
              ></input>

              <label>Cpu Model</label>
              <input
                value={cpuModel}
                onChange={(e) => setCpuModel(e.target.value)}
                placeholder="cpu model"
              ></input>

              <label>Cpu Serial Number</label>
              <input
                value={serialNum}
                onChange={(e) => setSerialNum(e.target.value)}
                placeholder="cpu serial number"
              ></input>

              <label>Remarks</label>
              <input
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="remarks"
              ></input>

              <label>Hostname</label>
              <input
                value={hostname}
                onChange={(e) => setHostname(e.target.value)}
                placeholder="hostname"
              ></input>

              <button>Submit</button>
              <br></br>
              <br></br>

              <img
                src={xButton}
                className="x-button"
                onClick={handleXClick}
              ></img>
            </form>
          </div>

          <div className="delete-confirmation-container" ref={deletePopupRef}>
            <div className="delete-confirmation-modal">
              <img
                src={xButton}
                className="x-button"
                onClick={() => {
                  setDeletePopupToggle(!deletePopupToggle);
                  setSelectedIp("");
                }}
              ></img>
              <h2>Delete Confirmation</h2>
              <div className="mid-section">
                <p>
                  Are you sure you want to delete this data with the Ip Address
                  of <span>{selectedIp}</span>
                </p>
              </div>
              <div className="buttons-container">
                <button
                  className="cancel"
                  onClick={() => {
                    setDeletePopupToggle(!deletePopupToggle);
                    setSelectedIp("");
                  }}
                >
                  Cancel
                </button>
                <button className="confirm" onClick={handleDeleteButton}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
