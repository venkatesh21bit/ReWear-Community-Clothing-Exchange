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
from apps.core.models import User

# Create admin superuser
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser(
        username='admin',
        email='admin@rewear.com', 
        password='admin123',
        first_name='Admin',
        last_name='User'
    )
    print('✅ Admin superuser created: admin/admin123')

# Create venkatesh superuser  
if not User.objects.filter(username='venkatesh').exists():
    User.objects.create_superuser(
        username='venkatesh',
        email='venkatesh@rewear.com', 
        password='venkat*2005',
        first_name='Venkatesh',
        last_name='User'
    )
    print('✅ Venkatesh superuser created: venkatesh/venkat*2005')

# Display all superusers
superusers = User.objects.filter(is_superuser=True)
print(f'📋 Available superusers: {[user.username for user in superusers]}')
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
