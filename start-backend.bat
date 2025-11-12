@echo off
title Backend Server - Portfolio
echo ========================================
echo Starting Portfolio Backend Server
echo ========================================
echo.

cd backend

echo Starting Spring Boot application...
echo Backend will be available at: http://localhost:8080
echo H2 Console: http://localhost:8080/h2-console
echo API Base URL: http://localhost:8080/api
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

call mvn spring-boot:run
