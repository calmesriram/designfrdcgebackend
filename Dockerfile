FROM node:12

WORKDIR /cgeproject

COPY package*.json ./

RUN npm install

COPY . /ram

EXPOSE 3000

CMD [ "node", "app.js" ]
