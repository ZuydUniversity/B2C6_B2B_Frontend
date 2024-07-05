#!/usr/bin/env bash

sudo docker stop main
sudo docker rm main
sudo docker pull zuydthmaz/frontendrepo:main
sudo docker run -d --name main -p 8080:8080 zuydthmaz/frontendrepo:main

####    Bash script om docker image uit repository te halen     ####
####    Maakt container van image en runt dit op poort 8008     ####