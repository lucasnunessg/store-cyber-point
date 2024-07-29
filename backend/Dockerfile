FROM node:16.14-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 3001


ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]