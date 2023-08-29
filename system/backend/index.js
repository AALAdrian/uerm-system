const mysql = require('mysql');
const express = require('express')
const app = express();
const addRouter = require('./routes/add.js')
const bodyParser = require('body-parser');
const e = require('express');

app.listen(3000,(err) => {
    if(err){
        console.log(err)
        return
    }
    console.log('app is listening to port 3000')
})

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user     : 'user',
  password : 'uerm',
  database: 'patrick db'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);

  const sql = 'INSERT INTO computer (ip_address, department, property_code, cpu_model, cpu_serial_no, remarks, hostname, status) VALUES("ipaddress_sample", "department_sample", "propertycode_sample", "cpumodel_sample", "cpuserial_num_sample", "remarks_sample", "hostname_sample", "status_sample")'
  
  app.use('/api/add', addRouter)
  app.get('/api/getData/:department?', (req, res) => {
    const {department} = req.params
    if(req.params == null){

    connection.query('SELECT * FROM computer', (err, result) => {
      if(err){
        console.log(err)
        return;
      }
      //console.log(res)
      res.send(result)
    })

  }
  else{
    connection.query('SELECT * FROM computer WHERE department = ?',[department], (err, result) => {
      if(err){
        console.log(err)
        return
      }
      res.send(result)
    })
  }

  })

});