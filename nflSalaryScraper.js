const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');

const util = require('util');

// this line just raises the max number of lines that can be displayed on terminal
util.inspect.defaultOptions.maxArrayLength = null; 

// const url = 'https://www.spotrac.com/nfl/rankings/2019/cap-hit/';
const url = 'https://www.pro-football-reference.com/players/salary.htm';

// this code gets html page from the url
let getPageData = (url) =>{
    return axios.get(url)
    .then(response => {
        //console.log(response.data);
        return response.data;
    })
    .catch(error => {
        console.log(error);
    }) 
}

// this function parses the html code and scrapes data from table
let getData = html => {
    info = [];
    const $ = cheerio.load(html);
    // based on the table on the site the 2nd child(td tag) of the row shows the player name
    $('tbody tr :nth-child(2)').each((i,elem) => {
        // create an object, and place name in specific var
        info.push({
            rank: "",
            playerName : $(elem).find('a').text().trim(),
            playerSalary: ""
        });
    });
    // gets player's salary rank
    let lastRank = '1';
    $('tbody tr').each((i,elem) => {
        // create an object, and place name in specific var
        let currRank = $(elem).find('th').text();
        if(currRank.length == 0){
            info[i].rank = lastRank;
        }
        else{
            info[i].rank = $(elem).find('th').text();
            lastRank = $(elem).find('th').text();
        } 
    });

    // go through a second time to get the actual salary
    // 3rd td tag shows the salary
    $('tbody tr :nth-child(5)').each((i,elem) => {
        info[i].playerSalary = $(elem).text().trim();
    });

    console.log(info);
};

//called the functions

let myhtmlPage = getPageData(url);

//allows the page to load and use it as argument for my function
myhtmlPage.then(function(result){
    getData(result);
});