document.addEventListener("DOMContentLoaded", listTabs);

function getCurrentWindowTabs() {
    return browser.tabs.query({
        currentWindow: true,
        active: true
    });
}


function listTabs() {
    getCurrentWindowTabs().then((tabs) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://raw.githubusercontent.com/cyber-score/database/main/web/" + getHostname(tabs[0].url)+".json", true);
        // get the json response
        xhr.responseType = 'json';
        xhr.onload = function () {
            let status = xhr.status;
            if (status == 200) {
                console.log(xhr.response);
                let data = xhr.response
                console.log(data);
                console.log(data.score)
                document.getElementById("logo").src = "./logos/cyberscore-"+data.score+".png"
            } else {
                document.getElementById("logo").src = "./logos/cyberscore-unknow.png"
            }
        }
        xhr.send();
    });
}


function getHostname(url) {
    var m = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    return m && m[1];
}