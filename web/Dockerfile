# Use the .NET Core SDK image as the base image
FROM mcr.microsoft.com/dotnet/sdk:latest AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the project files to the working directory
COPY . .

# Restore dependencies
RUN dotnet clean
RUN dotnet Restore

# Build the application
RUN dotnet build -c Release -o /app/build

# Expose port to the outside world
EXPOSE 5173

# Run the application
CMD ["dotnet", "run"]
