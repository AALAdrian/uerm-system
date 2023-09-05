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

router.patch('/edit/:ip', (req, res) => {
    const {ip} = req.params;
    axios.get(`/getDataByIp/${ip}`)
    .then(res => {
        console.log(res)
    })
    //const {ip} = req.params;
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
})

module.exports = router