import * as nfl from './nflSalaryScraper.js';
const Pool = require('pg').Pool;

let myPort = process.env.PORT;
let env = process.env.NODE_ENV;


let myPage = nfl.myhtmlPage;
let myobj;
myobj = myPage.then(function(result){
    myobj = nfl.getData(result);
    //console.log(myobj[0]);
});


if(process.env.DATABASE_URL != undefined){
    connectionString = {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    };
    console.log("Checking db");
    pool = new Pool(connectionString);
    console.log("After db we out here");
}

let myPage = nfl.myhtmlPage;
let myobj;
myobj = myPage.then(function(result){
    myobj = nfl.getData(result);
    //console.log(myobj[0]);
});