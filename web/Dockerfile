# Use official .NET Core SDK image as base
FROM mcr.microsoft.com/dotnet/sdk:latest AS builder

# Set working directory
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the application
COPY . .

# Build the application
RUN dotnet build -c Release -o /app

# Use lightweight .NET Core runtime image for production
FROM mcr.microsoft.com/dotnet/aspnet:latest

# Set working directory
WORKDIR /app

# Copy build files from previous stage
COPY --from=builder /app .

# Expose the port
EXPOSE 5173

# Command to run the application
ENTRYPOINT ["dotnet", "run"]
