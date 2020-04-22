# whatsapptracker
A framework to track and visualise online activity of someone in your whatsapp network. Please note that
this software does not endorse stalking or any other form of illegal activities. This was made with a an intention to learn things and not to invade anyone's privacy.

# Will my data/chat be safe ?

Everything is hosted locally and nothing is tracked or saved at all. Feel free to browse the code.

# How to install it ?

- Clone the repository and run the setup file.

`chmod +x ./setup.sh && docker-compose up -d`

- Run chrome with CORS enabled (to send data to your backend) and CSP disabled (to be able to run tracker.js in dev console).

- Open web.whatsapp.com in your browser

- Paste the tracker.js code into your chrome snippets and run it. You should see some logs now in the console.

- Now open chat window with a person you want to track. You can continue chatting or just leave it as it is for as long
as you want to monitor his/her online activity.

- As soon as the person you want to track comes online and then goes offline, the timespan (in seconds) and is updated

- Now run the setup
[here](http://localhost:3000) on grafana. The password for grafana can be
configured in the .env file.
