FROM node:18.16.0

WORKDIR /usr/src/app

COPY ./admin /usr/src/app/admin/

RUN npm install --prefix /usr/src/app/admin

RUN npm run build --prefix /usr/src/app/admin

COPY ./server /usr/src/app/server/

RUN npm install --prefix /usr/src/app/server

EXPOSE 9006

CMD ["npm", "start", "--prefix", "./server"]