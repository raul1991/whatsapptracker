from flask import Flask, request
from Tracker import Tracker

app = Flask(__name__)


tracker = Tracker()


@app.route('/track/<name>')
def track(name):
    data = request.get_json()
    tracker.update(name, data)


@app.route('/metrics')
def metrics():
    pass
