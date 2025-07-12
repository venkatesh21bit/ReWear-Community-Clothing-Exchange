@echo off
echo Starting Django Development Server...
echo.
echo Make sure PostgreSQL is running and database credentials are correct in .env
echo.

REM Change to backend directory
cd /d "%~dp0"

REM Activate virtual environment
call ..\\.venv\\Scripts\\activate.bat

REM Run the development server
python manage.py runserver

pause
