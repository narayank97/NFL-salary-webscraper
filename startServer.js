import * as myDb from './createNFLDB.js';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

var http = require('http');
var server = http.Server(app);

const getRecords = (request, response) => {
    myDb.pool.query('SELECT * FROM nflsalaries ORDER BY rank ASC', (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows);
      response.status(200).json(results.rows)
    })
  }


// sends public files to user
app.use('/',express.static(__dirname+'/public'));

//once you hit the website the home page is activated
app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/home.html');
});

app.get('/getRecords',getRecords);

app.listen(PORT,()=>console.log(`NFL SALARY APP is listening on port ${PORT}!`));