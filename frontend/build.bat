@echo off
echo Building ReWear Frontend for Production...
echo.

REM Change to frontend directory
cd /d "%~dp0"

echo Installing dependencies...
npm install

echo.
echo Building application...
npm run build

echo.
echo Build complete! You can now deploy the 'out' folder.
echo To test the production build locally, run: npm start

pause
