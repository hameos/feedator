FROM node:16

ENV NODE_ENV production

WORKDIR /feedator/services/event

COPY package*.json ./

RUN npm ci --only=production

COPY . ./

EXPOSE 4002

CMD ["node", "./src/server.js"]
