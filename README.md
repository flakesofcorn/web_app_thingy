# web_app_thingy

This project consists of a React frontend application with Node.js and .NET backend APIs.

## Folder Structure

- `frontend`: Contains the React frontend application.
- `server`: Houses the Node.js backend API.
- `web`: Holds the .NET backend API.

## Prerequisites

- Node.js installed on your machine.
- .NET SDK installed.
- Docker (optional, for Docker setup).

## Setup

### Without Docker

1. **Frontend Setup:**

   ```bash
   cd frontend
   npm install


2. **Node Backend Setup:**

    ```bash
    cd server
    npm install

3. **.NET Backend Setup:**

    ```bash
    cd web
    dotnet restore

4. **Run App Normally:**

**Start the React frontend:**

    
    cd frontend
    npm start

**Start the Node.js backend:**


    cd server
    node server.js

**Start the .NET backend:**


    cd web
    dotnet run


## With Docker (Using Docker Compose)
5. **Run App With Docker:**

    ```bash
    docker-compose build
    docker-compose up
## Additional Information
Customize the configuration files (Dockerfile, docker-compose.yml, etc.) as needed. \
Remember to change Mysql information in server/server.js to your own database (see db.sql in root folder).\
For production deployment, update environment variables and configurations accordingly.