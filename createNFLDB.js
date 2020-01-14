import * as nfl from './nflSalaryScraper.js';
export const Pool = require('pg').Pool;

let myPort = process.env.PORT||5432;
let env = process.env.NODE_ENV;

export let myconnectionString = {
    connectionString: "postgres://karunnarayan@localhost/mynfllocaldb",
    ssl: false
};
console.log("Checking db");
export let pool = new Pool(myconnectionString);
console.log("After db we out here");

if(process.env.DATABASE_URL != undefined){
    myconnectionString = {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    };
    console.log("Checking db");
    pool = new Pool(myconnectionString);
    console.log("After db we out here");
}

console.log(pool);

export const createTable = (conn) => {
    conn.query('CREATE TABLE IF NOT EXISTS nflsalaries(rank integer,name varchar(45),pos varchar(6),team varchar(4),salary varchar(15));', (error,results) =>{
        if(error){
            console.log("There was a Error in CreateTable");
            throw error;
        }
        console.log("WE HERE in create Table!!!!!!!!!");
        //response.status(200);
    });
}

export const dropTable = (conn) => {
    conn.query('DROP TABLE IF EXISTS nflsalaries CASCADE;', (error,results) =>{
        if(error){
            console.log("There was a Error in CreateTable");
            throw error;
        }
        console.log("Dropped the table");
        //response.status(200);
    });
}

export const insertRecord = (myConnection,obj) => {
    let query = myConnection.query("INSERT INTO nflsalaries(rank,name,pos,team,salary)values('"+parseInt(obj.rank,10)+"','"+obj.playerName+"','"+obj.position+"','"+obj.team+"','"+obj.playerSalary+"');", (error,results) =>{
    console.log(obj.rank);
    console.log(obj.playerName);
    console.log(obj.position);
    console.log(obj.team);
    console.log(obj.playerSalary);
        //'"+obj.rank+"','"+obj.playerName+"','"+obj.position+"','"+obj.team+"','"+obj.playerSalary+"'
        if(error){
            console.log("There was a Error when inserting boss");
            console.log(error);
            throw error;
        }
        //response.status(200).json(results.rows);
    });
}

/*
 dropTable(pool);
createTable(pool);
let finalProduct = nfl.myhtmlPage;
finalProduct.then(function(result){
    let myObj = nfl.getData(result);
    Promise.all(myObj).then(function(values){
        
        for(var i = 0; i < myObj.length;i++){
            (function(i)
            {
                console.log(i + "    !!!!!!!!!!!!!!!");
                console.log(myObj[i]);
                insertRecord(pool,values[i]);
            })(i);

        }
            
    });
*/