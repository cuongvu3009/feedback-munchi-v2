# Use the official Node.js image as the base image
FROM node:16-alpine

# Install Git
RUN apk update && apk add --no-cache git

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies with Yarn
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the port that the Next.js application will run on
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]
