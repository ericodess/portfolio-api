FROM node:18.16.0

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . .

EXPOSE 9006

CMD ["npm", "start"]