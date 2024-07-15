FROM node:16.14-alpine

WORKDIR /app-cyber-point

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm"]

CMD ["start"]