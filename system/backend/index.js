const mysql = require('mysql');
const express = require('express');
const app = express();
const addRouter = require('./routes/add.js');
const editRouter = require('./routes/edit.js');
const loginRouter = require('./routes/login.js')
const deleteRouter = require('./routes/delete.js');
const getDataByIdRouter = require('./routes/getDataByIp.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const e = require('express');
const ping = require('ping');

const targetHost = '10.107.4.15'; // Replace with the target IP address

ping.sys.probe(targetHost, (isAlive) => {
  if (isAlive) {
    console.log(`${targetHost} is online.`);
  } else {
    console.log(`${targetHost} is offline.`);
  }
});

app.listen(3000,(err) => {
    if(err){
        console.log(err)
        return
    }
    console.log('app is listening to port 3000')
})
app.use(cookieParser());
app.use(bodyParser.json());
app.use (
  session ({
      key: "userId",
      secret: "$Bwwti9nnU3BK1niBERucsOZ3LJMEcMQ/GHrAAol.VdwWJWw.AfHBW",
      resave: false,
      saveUninitialized: false,
      cookie: {
          maxAge: 60 * 60 * 1 * 1000,
      },
  })
);

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
  
  app.use('/api/add', addRouter);
  app.use('/api', editRouter);
  app.use('/api',deleteRouter);
  app.use('/api/login', loginRouter)
  app.get('/api/deleteCookie', (req,res) => {
    res.clearCookie('userId', {httpOnly: true});
    res.send('successfully cleared the data');
  })
  app.use('/api', getDataByIdRouter);
  app.get('/api/getData/:department?', (req, res) => {
    const {department} = req.params
    if(req.params.department == 'all' || req.params.department == 'undefined'){
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
      console.log(req.params)
      res.send(result)
    })
  }

  })



  

});