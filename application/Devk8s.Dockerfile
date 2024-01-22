# Stage 1
FROM node:14-alpine as node

# Get Variables
ARG API_URL 
ARG PDF_URL
ARG PRINT_URL
ARG FILE_URL
ARG USERNAME
ARG PASSWORD

WORKDIR /usr/app

COPY ./package.json /usr/app/package.json

# Install Dependencies
RUN npm install

COPY ./ /usr/app

# Build
RUN npm run build-prod

# Stage 2
FROM nginx:1.15.8-alpine

COPY --from=node /usr/app/default.conf /etc/nginx/conf.d/default.conf

COPY --from=node /usr/app/nginx-status /usr/share/nginx/html/nginx-status
COPY --from=node /usr/app/dist/fuse /usr/share/nginx/html

