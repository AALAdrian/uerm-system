const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const axios = require("axios");

const connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "uerm",
  database: "patrick db",
});

/*
router.get('/',(req, res) => {
    res.send('you successfully get requested /encode route')
    console.log("get request to /encode is successful")
})
*/

router.patch("/edit/:ipAddress", async (req, res) => {
  const {
    ip_address,
    department,
    property_code,
    cpu_model,
    cpu_serial_no,
    remarks,
    hostname,
  } = req.body;
  const updatedData = req.body;
  const { ipAddress } = req.params;
  console.log("this is the req.body", req.body);
  console.log("this is the ip address", ipAddress);
  const sql1 = "SELECT * FROM computer WHERE ip_address = ?";
  const queryResult = await new Promise((resolve, reject) => {
    connection.query(sql1, [ipAddress], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log(result[0]);
      resolve(result[0]);
    });
  });

  const edited = Object.keys(queryResult);
  //.filter(key => {
  //return updatedData[key] != queryResult[key];
  //})
  const updated = edited.filter((key) => {
    return updatedData[key] != queryResult[key];
  });
  console.log(edited);

  const setClause = updated.map((column) => {
    return `${column} = ?`; // Each column should be set to a parameter
  });
  console.log("this is setclause", setClause);

  const values = updated.map((column) => {
    return updatedData[column];
  });

  console.log("this is the values", values);

  console.log("this is the values", ...values);
  const sql = `UPDATE computer SET ${setClause.join(
    ", "
  )} WHERE ip_address = ?`;
  connection.query(sql, [...values, ipAddress], (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        err,
      });
      return;
    }
    console.log("data is edited");
    res.send("successfully edited the data");
  });
});

module.exports = router;
