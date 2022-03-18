FROM node:16

ENV NODE_ENV production

WORKDIR /feedator/services/importer

RUN wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2004-x86_64-100.5.2.deb

RUN apt-get install ./mongodb-database-tools-ubuntu2004-x86_64-100.5.2.deb

COPY package*.json ./

RUN npm ci --only=production

COPY . ./

EXPOSE 4001

CMD ["node", "./src/server.js"]
