FROM grafana/grafana:5.0.1
ADD ./provisioning /etc/grafana/provisioning
ADD ./config.ini /etc/grafana/config.ini
COPY ./dashboards conf/provisioning/dashboards