import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import './Admin.css'
import { useState } from "react";

function Admin() {
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [5, 10]; // Options for rows per page
  const defaultRowsPerPage = 10; // Default rows per page
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [dataCount, setDataCount] = useState(1);

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  return (
    <div className="admin-container">
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              {/* Table header content */}
              <TableCell align="center">Action</TableCell>
            </TableHead>
            <TableBody>
              {/* Render rows based on current page and rowsPerPage */}
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
    </div>
  );
}

export default Admin;
