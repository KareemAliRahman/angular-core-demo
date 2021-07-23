FROM postgres:13.3-alpine

RUN apk update

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY create-db.sql /docker-entrypoint-initdb.d 