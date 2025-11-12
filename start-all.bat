@echo off
echo ========================================
echo Full-Stack Portfolio Application
echo ========================================
echo.
echo This will start both backend and frontend servers.
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C in each window to stop the servers
echo.
pause

start "Portfolio Backend" cmd /k "@echo off
title Portfolio - All Servers

echo ================================
echo  Starting Portfolio Application
echo ================================
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Starting servers...
echo ================================

:: Start backend in new window
start "Backend Server" cmd /k "cd /d %~dp0 && start-backend.bat"

:: Wait a bit for backend to start
timeout /t 5 /nobreak > nul

:: Start frontend in new window
start "Frontend Server" cmd /k "cd /d %~dp0 && start-frontend.bat"

echo.
echo ✓ Both servers started!
echo.
echo Close this window when you're done.
echo The server windows will remain open.
pause"
timeout /t 10 /nobreak

start "Portfolio Frontend" cmd /k "cd /d V:\Portefolio && npm run dev"

echo.
echo Both servers are starting...
echo Check the separate windows for server status.
echo.
