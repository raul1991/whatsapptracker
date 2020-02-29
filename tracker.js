var tracker = (function(){
    var timeSpan = 0;
    var shouldSendRequest = false;
    var url = "";
    // selectors for main chat's name and status
    var selectors = {
        name: "div#main>header>div:nth-child(2)>div:nth-child(1)>div>span",
        status: "div#main>header>div:nth-child(2)>div:nth-child(2)>span"
    };

    var pollThread = function() {
        var person = getPersonInfo();
        if (isOnline()) {
            console.log(person.name + " is online");
            timeSpan += 1;
            // a flag to tell if we tracked something or not
            shouldSendRequest = true;
        }
        else if (shouldSendRequest) {
            sendRequest({
                name: person.name,
                timeSpan: timeSpan
            });
            timeSpan = 0;
            shouldSendRequest = false;
        }
    };

    var isOnline = function() {
        var lastSeenElement = document.querySelectorAll("._315-i._F7Vk")[0];
        return lastSeenElement.innerHTML.indexOf("online") != -1;
    };

   var getPersonInfo = function() {
        var name = document.querySelectorAll(selectors.name)[0].innerHTML;
    	var status = document.querySelectorAll(selectors.status)[0].innerHTML;
    	return {name: name, status: status};
   };

    var init = function(config) {
        var freq = config.freq || 1000;
        var serverUrl = config.serverUrl || 'localhost:5000';
        console.log("Initialized the polling thread");
        window.setInterval(pollThread, freq);
    };

    var sendRequest = function (data) {
        fetch('http://localhost:5000/track/mum', {
            method: 'POST',
            body: JSON.stringify({
                person: data['name'],
                timeSpan: data['timeSpan']
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(res=>res.json()).then(console.log);
    };

    return {
        init: init
    };
})();
tracker.init({serverUrl: 'localhost:5000', freq: 1000});