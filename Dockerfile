# Use the official Node.js image as the base image
FROM node:18-slim

RUN apt-get update -y \
  && apt-get install -y openssl

# Install Git
#RUN apk update && apk add --no-cache git

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies with Yarn
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

RUN npx prisma generate


# Build the Next.js application
RUN yarn build

# Expose the port that the Next.js application will run on
EXPOSE 3000

RUN chmod +x ./scripts/gcloud_start.sh

RUN chmod -R 777 ./node_modules/prisma

RUN ls -al node_modules/prisma

#RUN apk update && apk add bash
#RUN apk add --no-cache bash


#RUN npx prisma migrate deploy

# Start the server using the production build
#CMD [ "node", "dist/main.js" ]

CMD ["bash","./scripts/gcloud_start.sh"]

# Start the Next.js application
#CMD ["yarn", "start"]
