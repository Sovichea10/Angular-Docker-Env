FROM node:14-alpine as node
EXPOSE 8080

WORKDIR /usr/app

COPY ./package.json /usr/app/package.json

# Install Dependencies and Angular CLI 
RUN npm install
RUN npm install -g @angular/cli@8.1.2

COPY ./ /usr/app

# Start Application
CMD ng serve --host 0.0.0.0 --poll=2000

