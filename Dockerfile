# Use the official Node.js image as the base image
FROM node:18-slim

RUN apt-get update -y \
  && apt-get install -y openssl

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN npx prisma generate

RUN yarn build

EXPOSE 3000

RUN chmod +x ./scripts/gcloud_start.sh

RUN chmod -R 777 ./node_modules/prisma

RUN ls -al node_modules/prisma

CMD ["yarn", "start"]

