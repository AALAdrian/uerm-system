const express = require('express');
const router = express.Router()
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user     : 'user',
    password : 'uerm',
    database: 'patrick db'
  });

/*
router.get('/',(req, res) => {
    res.send('you successfully get requested /encode route')
    console.log("get request to /encode is successful")
})
*/

router.post('/', (req, res) => {

    const {ip, department, propCode, cpuModel, serialNum, remarks, hostname} = req.body;
    const sql = 'INSERT INTO computer (ip_address, department, property_code, cpu_model, cpu_serial_no, remarks, hostname) VALUES(?,?,?,?,?,?,?)'
    connection.query(sql, [ip,department,propCode,cpuModel,serialNum,remarks,hostname], (err, result) => {
        if(err){
            if(err.code == "ER_DUP_ENTRY"){
                res.send({
                    error: "the ip address already exists"
                })
            }
            return
        }
        console.log(result.affectedRows)
        res.send('successfully inserted the data')
    })
})

module.exports = router