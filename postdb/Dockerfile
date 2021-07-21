FROM postgres:13.3-alpine


# Install node/npm
RUN apk update \
        && apk add dos2unix

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

# Switch back to mssql user and run the entrypoint script
ENTRYPOINT /bin/bash ./entrypoint.sh
