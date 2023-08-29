const mysql = require('mysql');
const express = require('express')
const app = express();
const encodeRoute = require('./routes/encode.js')

app.listen(3000,(err) => {
    if(err){
        console.log(err)
        return
    }
    console.log('app is listening to port 3000')
})

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
  
  app.use('/api/encode', encodeRoute)


});