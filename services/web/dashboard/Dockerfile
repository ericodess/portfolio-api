FROM node:latest

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV production

EXPOSE 9005

CMD ["npm", "start"]