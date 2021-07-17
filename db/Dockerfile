FROM mcr.microsoft.com/mssql/server:2019-latest

# Switch to root user for access to apt-get install
USER root

# Install node/npm
RUN apt-get -y update \
        && apt-get install -y dos2unix

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY entrypoint.sh /usr/src/app
COPY import-data.sh /usr/src/app
COPY create-db.sql /usr/src/app 

RUN dos2unix entrypoint.sh
RUN dos2unix import-data.sh

# Grant permissions for the import-data script to be executable
RUN chmod +x /usr/src/app/import-data.sh

EXPOSE 1433

# Switch back to mssql user and run the entrypoint script
USER mssql
ENTRYPOINT /bin/bash ./entrypoint.sh