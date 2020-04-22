var tracker = (function() {
    var timeSpan = 0;
    var shouldSendRequest = false;
    var url = "";
    var interval = -1;
    // selectors for main chat's name and status
    var selectors = {
        name: "div#main>header>div:nth-child(2)>div:nth-child(1)>div>span",
        status: "div#main>header>div:nth-child(2)>div:nth-child(2)>span"
    };

    var pollThread = function() {
        var person = getPersonInfo();
        if (isOnline(person)) {
            console.log(person.name + " is online");
            timeSpan += 1;
            // a flag to tell if we tracked something or not
            shouldSendRequest = true;
        } else if (shouldSendRequest) {
            sendRequest({
                name: person.name,
                timeSpan: timeSpan
            });
            timeSpan = 0;
            shouldSendRequest = false;
        }
    };

    /**
    * Tells if the chat's header says "typing"
    * @param person object
    */
    var isTyping = function(person) {
        return person && person.status.indexOf("typing") != -1;
    };

    /**
    * Tells if the chat's header says "online"
    * @param person object
    */
    var isJustOnline = function(person) {
        return person && person.status.indexOf("online") != -1;
    };

    /**
    * Return true if a person is either typing or just online.
    * @param person the person object
    */
    var isOnline = function(person) {
        return person && (isJustOnline(person) || isTyping(person));
    };

    var getNodesBy = function(css) {
        var matches = document.querySelectorAll(css);
        return matches.length > 0 ? matches[0].innerHTML : null;
    };

    var getPersonInfo = function() {
        var name = getNodesBy(selectors.name) || '';
        var status = getNodesBy(selectors.status) || 'offline';
        return {
            name: name,
            status: status
        };
    };

    var init = function(config) {
        var freq = config.freq || 1000;
        var serverUrl = config.serverUrl || 'localhost:5000';
        console.log("Initialized the polling thread");
        interval = window.setInterval(pollThread, freq);
    };

    var sendRequest = function(data) {
        fetch('http://localhost:5000/track/' + data['name'], {
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

    var stop = function() {
        clearInterval(interval);
        console.log("Tracking stopped.");
    };

    return {
        init: init,
        stop: stop
    };
}
)();
tracker.init({
    serverUrl: 'localhost:5000',
    freq: 1000
});
