#!/bin/bash
set -e  # Exit on any error
echo "🚀 RAILWAY DEPLOYMENT: Running Django migrations and starting server..."

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Running database migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Creating superuser (if not exists)..."
python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(is_superuser=True).exists():
    User.objects.create_superuser('admin', 'admin@rewear.com', 'admin123')
    print('Superuser created')
else:
    print('Superuser already exists')
"

echo "Starting gunicorn server..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
