const express = require('express');
const router = express.Router()
const mysql = require('mysql')
const axios = require('axios')

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

router.patch('/edit/:ip', async (req, res) => {
    const {ipAddress, department}
    const {ip} = req.params;
    const sql1 = 'SELECT * FROM computer WHERE ip_address = ?';
    const queryResult = await new Promise((resolve, reject) => {
        connection.query(sql1, [ip], (err, result) => {
            if(err){
                console.log(err)
                reject(err)
            }
            resolve(result[0]);
        })
    })

    console.log(queryResult);
    const edited = Object.keys(queryResult).filter(key => {
        key
    })
    //const {ip} = req.params;
    /*
    const sql = "UPDATE computer SET ";
    console.log(ip)
    connection.query(sql, [ip], (err, result) => {
        if(err){
            res.send({
                err
            })
            return;
        }
        console.log("data is deleted")
        res.send('successfully deleted the data')
    })
    */
})

module.exports = router