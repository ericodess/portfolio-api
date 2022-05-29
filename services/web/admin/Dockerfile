FROM node:lts-gallium

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install --force

COPY . .

EXPOSE 9005

CMD ["npm", "run", "dev"]