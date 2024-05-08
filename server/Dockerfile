# Use the official Node.js image as base
FROM node:latest

# Set working directory
WORKDIR /usr/src/server

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Command to run your app using nodemon
CMD ["node", "server.js"]
