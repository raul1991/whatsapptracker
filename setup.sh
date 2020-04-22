#!/bin/bash
# creating an external network so it runs in isolation
sudo docker network create --driver=bridge --subnet=100.109.1.0/24 br0a
sudo docker-compose up
