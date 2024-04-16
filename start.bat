@echo off

REM Start the Express server
cd server
start cmd /k "npm start"

REM Wait for the Express server to start (adjust sleep time as needed)
timeout /t 5

REM Start the C# backend
cd web
start cmd /k "dotnet run"

REM Wait for the C# backend to start (adjust sleep time as needed)
timeout /t 5

REM Start the React frontend
cd frontend
start cmd /k "npm start"

exit
