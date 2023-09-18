const express = require('express');
const router = express.Router()
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user     : 'user',
    password : 'uerm',
    database: 'patrick db'
  });



router.get("/api/getStatus/:ip", (req, res) => {
    const { ip } = req.params;
    console.log(ip);
    ping.sys.probe(ip, (isAlive) => {
      if (isAlive) {
        connection.query(
          "UPDATE computer SET status = ? WHERE ip_address = ?",
          ["on", ip],
          (err, result) => {
            if (err) {
              console.log("this is the error", err);
            }
            console.log("this is the result", result);
          }
        );
      } else {
        connection.query(
          "UPDATE computer SET status = ? WHERE ip_address = ?",
          ["off", ip]
        );
      }
    });
  });


  module.exports = router;