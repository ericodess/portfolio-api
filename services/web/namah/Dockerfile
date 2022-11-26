FROM node:latest

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . .

EXPOSE 9002

CMD ["npm", "start"]