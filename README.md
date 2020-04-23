# Important

This is just a temp branch which can only run the whole thing using kustomizer
installation because of some issue in grafana images above 5.1.
In this you'll get everything but the dashboard. You have to create it manually
using grafana and add metric ```online_time_span > 0``` in the query.

You can then see the visualization. I'll make a fix in the master branch and remove
this branch then.

# whatsapptracker
A framework to track and visualise online activity of someone in your whatsapp network. Please note that
this software does not endorse stalking or any other form of illegal activities. This was made with a an intention to learn things and not to invade anyone's privacy.

# Will my data/chat be safe ?

Everything is hosted locally and nothing is tracked or saved at all. Feel free to browse the code.

# Minimum requirement
- docker client installed

# How to run via docker compose
- ```chmod +x ./setup.sh && ./setup.sh```

# How to run on kubernetes (k8s)
- ```kubectl apply -k kustomizer/```

Note: In order to delete the above specs, use the following
- ```kubectl delete -k kustomizer/```

# Automating all this using skaffold
- Install [skaffold](https://skaffold.dev/docs/install/) and the run the following
- ```sudo skaffold dev --port-forward --kube-context=minikube --default-repo=<a-docker-repo>```

The above command requires a docker repo which can either be 
```docker.io/<your-username-on-dockerhub>```  or a local/private registry that you have.

Note: The above does not work well because grafana latest image has some problem related to uid.

# End to End setup using docker ?

- Clone the repository and run the setup file.

`chmod +x ./setup.sh && docker-compose up -d`

### Browser setup
- Run chrome with CORS enabled (to send data to your backend) and CSP disabled (to be able to run tracker.js in dev console).

- Open web.whatsapp.com in your browser

- Paste the tracker.js code into your chrome snippets and run it. You should see some logs now in the console.

- Now open chat window with a person you want to track. You can continue chatting or just leave it as it is for as long
as you want to monitor his/her online activity.

- As soon as the person you want to track comes online and then goes offline, the timespan (in seconds) and is updated

- Now run the setup
[here](http://localhost:3000) on grafana. The password for grafana can be
configured in the .env file but by default it'll be admin/admin and then you can change it. Open the whatsapptracker
dashboard to see the visual changes in case your friend gets online on whatsapp.
