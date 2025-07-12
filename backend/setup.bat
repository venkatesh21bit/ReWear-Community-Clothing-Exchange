@echo off
echo Setting up Django Backend for Development...
echo.

REM Change to backend directory
cd /d "%~dp0"

REM Activate virtual environment
call ..\\.venv\\Scripts\\activate.bat

echo Installing dependencies...
pip install -r requirements.txt

echo.
echo Running Django setup...
python manage.py setup_db

echo.
echo Setup complete! You can now run: start_server.bat
echo Or manually run: python manage.py runserver

pause
