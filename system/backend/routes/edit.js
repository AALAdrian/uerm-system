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
    const { ipAddress } = req.params;
    const updatedData = req.body;
    console.log("this is the req.body", req.body);
    console.log("this is the ip address", ipAddress);
  
    const sql1 = "SELECT * FROM computer WHERE ip_address = ?";
    connection.query(sql1, [ipAddress], async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred while fetching data" });
        return;
      }
  
      if (result.length === 0) {
        res.status(404).json({ error: "Record not found" });
        return;
      }
  
      const existingData = result[0];
  
      const setClause = [];
      const values = [];
  
      for (const key in updatedData) {
        if (updatedData[key] !== existingData[key]) {
          setClause.push(`${key} = ?`);
          values.push(updatedData[key]);
        }
      }
  
      console.log("this is setClause", setClause);
      console.log("this is the values", values);
  
      const sql = `UPDATE computer SET ${setClause.join(", ")} WHERE ip_address = ?`;
      values.push(ipAddress);
  
      connection.query(sql, values, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: "An error occurred while updating data" });
          return;
        }
        console.log("data is edited");
        res.send("Successfully edited the data");
      });
    });
  });
  

module.exports = router;
