const express = require('express');
const router = express.Router()
const mysql = require('mysql')
const ping = require('ping')

const pool = mysql.createPool({
  host: "localhost",
  user: "user",
  password: "uerm",
  database: "patrick db",
});

router.get("/getStatus/:ip", async (req, res) => {
  try {
    const { ip } = req.params;
    
    const isAlive = await pingHost(ip); // Assuming you have a function to ping the host
    
    const status = isAlive ? "on" : "off";

    await updateStatusInDatabase(ip, status);

    res.json({ message: `Status updated to ${status}` });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function pingHost(ip) {
  return new Promise((resolve) => {
    ping.sys.probe(ip, (isAlive) => {
      resolve(isAlive);
    });
  });
}

async function updateStatusInDatabase(ip, status) {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE computer SET status = ? WHERE ip_address = ?",
      [status, ip],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}


module.exports = router;