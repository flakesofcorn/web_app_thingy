# Use the official Node.js image as base
FROM node:latest

# Set working directory
WORKDIR /usr/src/server

# Install system dependencies for bcrypt
RUN apt-get update && \
    apt-get install -y build-essential python3 && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install application dependencies
RUN npm install

# Rebuild bcrypt from source
RUN npm rebuild bcrypt --build-from-source

# Remove system dependencies after rebuilding bcrypt
RUN apt-get remove -y build-essential python3 && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy the rest of the application
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Command to run your app using nodemon
CMD ["node", "server.js"]
