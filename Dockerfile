FROM nginx:1.12-alpine

RUN mkdir -p /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

COPY ./build /usr/share/nginx/html