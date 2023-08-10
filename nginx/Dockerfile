FROM node:18.17.1 as builder

WORKDIR /usr/src/app

ARG HOME_CODE_LOCATION=./home

COPY ${HOME_CODE_LOCATION} .

RUN npm install
RUN npm run build

FROM nginx:1.25.0

ARG CONFIG_FILE_LOCATION=./reverse_proxy.conf

COPY ${CONFIG_FILE_LOCATION} /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist/home /usr/share/nginx/html

EXPOSE 80
EXPOSE 443
