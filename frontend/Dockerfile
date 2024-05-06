# Use official Node.js image as base
FROM node:latest AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Use lightweight Node.js image for production
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy build files from previous stage
COPY --from=builder /app/build ./build

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["node", "build/index.js"]
