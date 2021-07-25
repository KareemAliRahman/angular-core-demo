# build stage
FROM node:16-alpine as build-stage
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run start
# CMD ["npm", "run", "start"]
EXPOSE 4200
RUN ng serve --host 0.0.0.0 