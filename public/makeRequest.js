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
        let responseString = xhr.responseText;
        let object = JSON.parse(responseString);
        let JSONstring = JSON.stringify(object,undefined,2);
        console.log(JSONstring);

    };

    xhr.onerror = function(){
        alert("WHOOPS there was an error!");
    }

    xhr.send();

}