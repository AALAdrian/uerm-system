const express = require('express');
const router = express.Router()
const mysql = require('mysql')
const bcrypt = require('bcrypt')

const connection = mysql.createConnection({
    host: 'localhost',
    user     : 'user',
    password : 'uerm',
    database: 'patrick db'
  });

  router.post('/', async (req, res) => {
    const {username, password} = req.body;
        connection.query('SELECT * FROM user WHERE username = ?', [username], async (err, result) => {

        if(err){
            res.send(err)
            return
        }

        if(result.length > 0){
           const response = await bcrypt.compare(password, result[0].password, (err, response) => {
                if(response){
                    req.session.user = result;
                    res.send(true);
                }
                else{
                    res.send(false);
                }
            })
            
        }
    })
    
    //bcrypt.compare()
    //connection.query()
  })

  router.get("/", (req, res) => {
    console.log("this is login get")
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  });

  module.exports = router