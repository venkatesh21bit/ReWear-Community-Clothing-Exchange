#!/bin/bash
set -e  # Exit on any error
echo "🚀 RAILWAY DEPLOYMENT: Starting Django application..."

echo "Checking Python environment..."
python --version
pip --version

echo "Running database migrations..."
python manage.py migrate --noinput

echo "Static files already collected locally - skipping collectstatic..."
ls -la static/ || echo "Static directory listing failed"

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
    print('✅ Superuser created')
else:
    print('ℹ️ Superuser already exists')
"

echo "🚀 Starting gunicorn server..."
echo "PORT: $PORT"
echo "RAILWAY_ENVIRONMENT: $RAILWAY_ENVIRONMENT"
exec gunicorn config.wsgi:application \
    --bind 0.0.0.0:$PORT \
    --workers 2 \
    --timeout 120 \
    --keep-alive 2 \
    --max-requests 1000 \
    --max-requests-jitter 100 \
    --log-level info \
    --access-logfile - \
    --error-logfile -
