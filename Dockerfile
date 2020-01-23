FROM nginx:stable
MAINTAINER Wildan Firdaus "firdaus@alterra.id"

RUN mkdir -p /var/www/robotaku-frontend
RUN mkdir -p /var/logs/nginx

COPY default.conf /etc/nginx/conf.d/
COPY . /var/www/robotaku-frontend

WORKDIR /var/www/robotaku-frontend