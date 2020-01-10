import * as nfl from './nflSalaryScraper.js';
const Pool = require('pg').Pool;

let myPort = process.env.PORT;
let env = process.env.NODE_ENV;


if(process.env.DATABASE_URL != undefined){
    let myconnectionString = {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    };
    console.log("Checking db");
    let pool = new Pool(myconnectionString);
    console.log("After db we out here");
}

const createTable = () => {
    pool.query('CREATE TABLE IF NOT EXISTS nflsalaries(rank varchar(4),name varchar(45),pos varchar(4),team varchar(4), salary varchar(15))', (error,results) =>{
        if(error){
            console.log("There was a Error in CreateTable");
            throw error;
        }
        console.log("WE HERE in create Table!!!!!!!!!");
        //console.log(results);
        //response.status(200);
    })
}
createTable();



// let myPage = nfl.myhtmlPage;
// myPage.then(function(result){
//     myobj = nfl.getData(result);
//     //console.log(myobj[0]);
// });