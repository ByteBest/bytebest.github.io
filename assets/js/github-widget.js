/*
  Taken from https://griimnak.me/assets/
 */
var githubApi = {};
githubApi.header = {};
githubApi.baseUrl = "https://api.github.com";
githubApi.header.Accept = "application/vnd.github.v3+json";

githubApi.readOnlyMode = true;
githubApi.header.Authorization = "token  <token>";
githubApi.username = "ByteBest";

githubApi.nameRepo = "";
githubApi.sha = "";
githubApi.path = "";
githubApi.newFile = false;

function apiRequest(method, url, jsonData, callback) {
    // make request
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 ){
            if(xhr.status == 200 || xhr.status == 201) {
                callback(xhr.responseText);
            }
            else {
                // log error
                console.log(xhr.status);
                console.log(xhr.responseText);
            }
        }
    }
    xhr.open(method, url, true);
    // Github api Token is required if we want management access
    if (githubApi.readOnlyMode == false) {
        for(var key in githubApi.header) {
            xhr.setRequestHeader(key, githubApi.header[key]);
        }
    }
    xhr.send(jsonData);
}

function list() {
    var url = githubApi.baseUrl+"/users/"+githubApi.username+"/repos";
    apiRequest("GET", url, null, function(r) {
        var jsonRsp = JSON.parse(r);
        for(var k in jsonRsp){
            renderElements(
                jsonRsp[k]['name'],
                jsonRsp[k]['description'],
                jsonRsp[k]['stargazers_count'],
                jsonRsp[k]['stargazers_url'],
            );
        }
    });
}

function renderElements(name, description, stargazers_count, stargazers_url) {
    var container = document.getElementById("git_repos");

    var html = `
      <div class="item">
        <div class="desc">
          <h3>${name}</h3>
          <p>${description}</p>
        </div>
        <div class="git_btns">
          <a href="#" class="git_cloud"><img src="assets/media/git_cloud.svg"> 0</a>
          <a href="${stargazers_url}" class="git_star"><img src="assets/media/git_star.svg"> ${stargazers_count}</a>
          <a href="#" class="git_contrib">
            <img src="https://github.com/griimnak.png">
            <img src="https://github.com/TesoMayn.png">
          </a>
        </div>
      </div>
    `;

    container.innerHTML += html;
}


list();
