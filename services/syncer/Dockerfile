FROM node:16

ENV NODE_ENV production

WORKDIR /feedator/services/syncer

COPY package*.json ./

RUN npm ci --only=production

COPY . ./

EXPOSE 4000

CMD ["node", "./src/server.js"]
