import * as nfl from './nflSalaryScraper.js';
const Pool = require('pg').Pool;

let myPort = process.env.PORT;
let env = process.env.NODE_ENV;

let pool;
if(process.env.DATABASE_URL != undefined){
    let myconnectionString = {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    };
    console.log("Checking db");
    pool = new Pool(myconnectionString);
    console.log("After db we out here");
}

const createTable = (conn) => {
    conn.query('CREATE TABLE IF NOT EXISTS nflsalaries(rank varchar(4),name varchar(45),pos varchar(4),team varchar(4),salary varchar(15))', (error,results) =>{
        if(error){
            console.log("There was a Error in CreateTable");
            throw error;
        }
        console.log("WE HERE in create Table!!!!!!!!!");
        console.log(results);
        //response.status(200);
    });
}

const dropTable = (conn) => {
    conn.query('DROP TABLE IF EXISTS nflsalaries CASCADE;', (error,results) =>{
        if(error){
            console.log("There was a Error in CreateTable");
            throw error;
        }
        console.log("Dropped the table");
        console.log(results);
        //response.status(200);
    });
}

const insertRecord = (myConnection,obj) => {
    myConnection.query("INSERT INTO nflsalaries(rank,name,pos,team,salary)values('"+obj.rank+"','"+obj.playerName+"','"+obj.position+"','"+obj.team+"','"+obj.playerSalary+"')", (error,results) =>{
    if(error){
        console.log("There was a Error when inserting boss");
        throw error;
    }
    console.log(results.rows);
        //response.status(200).json(results.rows);
    });
}
//createTable(pool);


console.log("HI");
// let myPage = nfl.myhtmlPage;
// myPage.then(function(result){
//     let myobj = nfl.getData(result);
//     for(let i = 0; i < myobj.length; i++){
//         console.log(i);
//         insertRecord(pool,myobj[i]);
//     }
// });
dropTable(pool);
createTable(pool);
let finalProduct = nfl.myhtmlPage;
finalProduct.then(function(result){
    let myObj = nfl.getData(result);
    Promise.all(myObj).then(function(values){
        for(let i = 0; i < myObj.length;i++){
            console.log(i + "    !!!!!!!!!!!!!!!");
            insertRecord(pool,myObj[i]);
        }
    });
    
});