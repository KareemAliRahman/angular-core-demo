# build stage
FROM node:16-alpine as build-stage
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

# 
FROM nginx:1.21.1-alpine
COPY --from=build-stage /app/dist/front/ /usr/share/nginx/html
EXPOSE 4200:80
# COPY nginx.conf /etc/nginx/conf.d/default.conf
