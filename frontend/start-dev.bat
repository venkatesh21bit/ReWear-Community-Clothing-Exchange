@echo off
echo Starting ReWear Frontend Development Server...
echo.

REM Change to frontend directory
cd /d "%~dp0"

echo Installing dependencies...
npm install

echo.
echo Starting development server...
echo The application will be available at: http://localhost:3000
echo.

npm run dev

pause
