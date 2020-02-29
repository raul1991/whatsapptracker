import json

from flask import Flask, request, Response
from Tracker import Tracker

app = Flask(__name__)


tracker = Tracker()


@app.route('/track/<name>', methods=['POST'])
def track(name):
    data = request.get_json()
    tracker.update(name, data)
    return json.dumps({"status": "Ok"})


@app.route('/metrics')
def metrics():
    return tracker.get_metrics()


app.run(host='0.0.0.0', debug=True, port=5000)
