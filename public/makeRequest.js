let originalDiv;

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
            let newDivRankContent = document.createTextNode(object[i].rank.trim());
            newDivRank.appendChild(newDivRankContent);
            newDiv.appendChild(newDivRank);

            let newDivName = document.createElement("div");
            newDivName.id = "dbCol";
            newDivName.className="name";
            let newDivNameContent = document.createTextNode(object[i].name.trim());
            newDivName.appendChild(newDivNameContent);
            newDiv.appendChild(newDivName);

            let newDivPos = document.createElement("div");
            newDivPos.id = "dbCol";
            newDivPos.className ="pos";
            let newDivPosContent = document.createTextNode(object[i].pos.trim());
            newDivPos.appendChild(newDivPosContent);
            newDiv.appendChild(newDivPos);

            let newDivTeam = document.createElement("div");
            newDivTeam.id = "dbCol";
            newDivTeam.className="team";
            let newDivTeamContent = document.createTextNode(object[i].team.trim());
            newDivTeam.appendChild(newDivTeamContent);
            newDiv.appendChild(newDivTeam);

            let newDivSalary = document.createElement("div");
            newDivSalary.id = "dbCol";
            newDivSalary.className="salary";
            let newDivSalaryContent = document.createTextNode(object[i].salary.trim());
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
    if(originalDiv == null){
        originalDiv = playersFound;
        console.log(originalDiv);
        console.log(originalDiv.length);
        
    }
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

function reAppear(){
    //console.log("REAPPEARING");
    let input,i;
    input = document.getElementById("playerName").value;
    console.log(input);
    if(input == ""){;
        for(i = 0; i < 1914;i++){
            originalDiv[i].style.display = "";
        }
    }
}

function hitEnter(){
    let input = document.getElementById("playerName");
    input.addEventListener("keyup",function(event){
        if(event.keyCode === 13){
            event.preventDefault();
            document.getElementById("btn").click();
        }
    });
}

function run2Funcs(){
    hitEnter();
    reAppear();
}

function teamSelected(clicked){
    let filter,outterDiv,playersFound,i,currTeamName,txtValue;
    console.log(typeof(clicked));
    filter = clicked.toUpperCase();
    console.log("This is a filter"+filter);
    outterDiv = document.getElementById("records");
    playersFound = outterDiv.getElementsByClassName("newRecord");
    if(originalDiv == null){
        originalDiv = playersFound;
        
    }
    //console.log(playersFound[i]);
    for(i = 0; i < playersFound.length;i++){
        playerDiv = playersFound[i];
        currTeamName = playerDiv.getElementsByClassName("team")[0];
        txtValue = currTeamName.innerText;
        // console.log(txtValue);
        if(txtValue.toUpperCase().indexOf(filter) > -1){
            playersFound[i].style.display = "";
        }
        else{
            playersFound[i].style.display = "none";
        } 
    }
    console.log(clicked);
}