from flask import Response
from prometheus_client import Gauge, generate_latest

CONTENT_TYPE_LATEST = str('text/plain; charset=utf-8')


class Tracker(object):
    users = {}

    def __init__(self):
        print("Tracker initialized")
        self.online_time_span = Gauge('online_time_span', 'How long someone has been online on whatsapp', ['value'])

    def update(self, name, data):
        time_span = data['timeSpan']
        self.users[name] = data
        print('%s was online for %s'.format(name, time_span))
        self.online_time_span.labels('online_time').set(time_span)

    def get_metrics(self):
        return Response(generate_latest(), mimetype=CONTENT_TYPE_LATEST)
