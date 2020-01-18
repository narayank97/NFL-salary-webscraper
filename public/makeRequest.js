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
            newDivRank.id = "rank";
            newDivRank.className = "dbCol";
            let newDivRankContent = document.createTextNode(object[i].rank);
            newDivRank.appendChild(newDivRankContent);
            newDiv.appendChild(newDivRank);

            let newDivName = document.createElement("div");
            newDivName.id = "name";
            newDivName.className="dbCol";
            let newDivNameContent = document.createTextNode(object[i].name);
            newDivName.appendChild(newDivNameContent);
            newDiv.appendChild(newDivName);

            let newDivPos = document.createElement("div");
            newDivPos.id = "pos";
            newDivPos.className ="dbCol";
            let newDivPosContent = document.createTextNode(object[i].pos);
            newDivPos.appendChild(newDivPosContent);
            newDiv.appendChild(newDivPos);

            let newDivTeam = document.createElement("div");
            newDivTeam.id = "team";
            newDivTeam.className="dbCol";
            let newDivTeamContent = document.createTextNode(object[i].team);
            newDivTeam.appendChild(newDivTeamContent);
            newDiv.appendChild(newDivTeam);

            let newDivSalary = document.createElement("div");
            newDivSalary.id = "salary";
            newDivSalary.className="dbCol";
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