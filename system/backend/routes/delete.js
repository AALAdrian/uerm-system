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

router.delete('/delete/:ip', (req, res) => {

    console.log("this is req.params",req.params)
    const {ip} = req.params;
    const sql = "DELETE FROM computer WHERE ip_address = ?";
    console.log(ip);
    connection.query(sql, [ip], (err, result) => {
        if(err){
            res.send({
                err
            })
            return
        }
        console.log("data is deleted")
        res.send('successfully deleted the data')
    })
})

module.exports = router