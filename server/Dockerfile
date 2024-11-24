FROM node:lts-alpine

ENV NODE_ENV=demo

WORKDIR /usr/src/app

COPY ["package.json", "./"]

RUN npm install

COPY . .

EXPOSE 9090

RUN chown -R node /usr/src/app

USER node

CMD ["npm", "start"]
