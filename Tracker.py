from prometheus_client import Gauge


class Tracker(object):
    users = {}
    g = Gauge('online_time_span', 'How long someone has been online on whatsapp')

    def __init__(self) -> None:
        print("Tracker initialized")

    def update(self, name, data: {}):
        time_span = data['timeSpan']
        self.users[name] = data
        print('%s was online for %s'.format(name, time_span))
        g.set(time_span)
