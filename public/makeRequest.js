function createCORSRequest(method,url){
    let xhr = new XMLHttpRequest();
    xhr.open(method,url,true);
    return xhr;
}

function getAllSalaries(){
    let url = "/getRecords";
    let xhr = createCORSRequest('GET',url);

    if(!xhr){
        alert("CORS not supported");
        return;
    }
    
    xhr.onload = function(){
        console.log("HELLO THEREs");
        let responseString = xhr.responseText;
        let object = JSON.parse(responseString);
        let JSONstring = JSON.stringify(object,undefined,2);
        for(let i = 0; i < object.length; i++){
            let newDiv = document.createElement("div");
            newDiv.className= "newRecord";

            let newDivRank = document.createElement("div");
            newDivRank.id = "dbCol";
            newDivRank.className = "rank";
            let newDivRankContent = document.createTextNode(object[i].rank);
            newDivRank.appendChild(newDivRankContent);
            newDiv.appendChild(newDivRank);

            let newDivName = document.createElement("div");
            newDivName.id = "dbCol";
            newDivName.className="name";
            let newDivNameContent = document.createTextNode(object[i].name);
            newDivName.appendChild(newDivNameContent);
            newDiv.appendChild(newDivName);

            let newDivPos = document.createElement("div");
            newDivPos.id = "dbCol";
            newDivPos.className ="pos";
            let newDivPosContent = document.createTextNode(object[i].pos);
            newDivPos.appendChild(newDivPosContent);
            newDiv.appendChild(newDivPos);

            let newDivTeam = document.createElement("div");
            newDivTeam.id = "dbCol";
            newDivTeam.className="team";
            let newDivTeamContent = document.createTextNode(object[i].team);
            newDivTeam.appendChild(newDivTeamContent);
            newDiv.appendChild(newDivTeam);

            let newDivSalary = document.createElement("div");
            newDivSalary.id = "dbCol";
            newDivSalary.className="salary";
            let newDivSalaryContent = document.createTextNode(object[i].salary);
            newDivSalary.appendChild(newDivSalaryContent);
            newDiv.appendChild(newDivSalary);

            console.log(i);

            document.getElementById("records").appendChild(newDiv);

        }
        // console.log(JSONstring);

    };

    xhr.onerror = function(){
        alert("WHOOPS there was an error!");
    }

    xhr.send();

}

function search(){
    let input,filter,outterDiv,playersFound,i,currPlayerName,txtValue;
    input = document.getElementById("playerName");
    filter = input.value.toUpperCase();
    outterDiv = document.getElementById("records");
    playersFound = outterDiv.getElementsByClassName("newRecord");
    for(i = 0; i < playersFound.length;i++){
        playerDiv = playersFound[i];
        currPlayerName = playerDiv.getElementsByClassName("name")[0];
        txtValue = currPlayerName.innerText;
        if(txtValue.toUpperCase().indexOf(filter) > -1){
            playersFound[i].style.display = "";
        }
        else{
            playersFound[i].style.display = "none";
        } 
    }
}