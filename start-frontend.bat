@echo off
title Frontend Server - Portfolio
cd /d "%~dp0"
echo ================================
echo  Starting Frontend Server
echo ================================
echo.
echo Server will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ================================
echo.

npm run dev
