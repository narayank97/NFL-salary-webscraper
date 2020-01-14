const express = require('express');
const app = express();
const PORT = process.env.PORT || 5432;

var http = require('http');
var server = http.Server(app);

// sends public files to user
app.use('/',express.static(__dirname+'/public'));

//once you hit the website the home page is activated
app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/home.html');
});

app.listen(PORT,()=>console.log(`NFL SALARY APP is listening on port ${PORT}!`));