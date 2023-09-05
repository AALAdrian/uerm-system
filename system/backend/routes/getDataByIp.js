const express = require('express');
const router = express.Router()
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user     : 'user',
    password : 'uerm',
    database: 'patrick db'
  });

router.get('/getDataByIp/:ip',(req, res) => {
    const {ip} = req.params;
    const sql = 'SELECT * FROM computer WHERE ip_address = ?'
    connection.query(sql, [ip], (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
            return
        }
        const firstRow = result[0];
        console.log(firstRow)
        res.send(firstRow)
    })
})

module.exports = router;