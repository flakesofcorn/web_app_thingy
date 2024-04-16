# Stage 1 - Build React Frontend
FROM node:14 AS react-build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Stage 2 - Build SignalR .NET Backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dotnet-build
WORKDIR /app
COPY backend/SignalRBackend.csproj ./backend/
RUN dotnet restore backend/SignalRBackend.csproj
COPY backend ./backend
RUN dotnet publish -c Release -o out backend/SignalRBackend.csproj

# Stage 3 - Build Express Server
FROM node:14 AS express-server
WORKDIR /app
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server ./

# Stage 4 - Final Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=react-build /app/build ./frontend/build
COPY --from=dotnet-build /app/out ./backend/out
COPY --from=express-server /app ./

# Expose ports
EXPOSE 3000 5000

CMD ["node", "server.js"]
