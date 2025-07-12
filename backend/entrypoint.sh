#!/bin/bash
set -e  # Exit on any error
echo "🚀 RAILWAY DEPLOYMENT: Starting Django application..."

echo "Checking Python environment..."
python --version
pip --version

#!/bin/bash
set -e  # Exit on any error
echo "🚀 RAILWAY DEPLOYMENT: Starting Django application..."

echo "Checking Python environment..."
python --version
pip --version

echo "Setting up database migrations..."
# For Railway PostgreSQL, we'll handle migrations more carefully
echo "Checking migration status..."

# Check if we can connect to database and if it has any tables
if python -c "
import django
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()
from django.db import connection
try:
    with connection.cursor() as cursor:
        cursor.execute(\"SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public'\")
        table_count = cursor.fetchone()[0]
        print(f'Database has {table_count} tables')
        if table_count == 0:
            print('FRESH_DATABASE')
        else:
            print('EXISTING_DATABASE')
except Exception as e:
    print(f'DATABASE_ERROR: {e}')
    print('FRESH_DATABASE')
" | grep -q "FRESH_DATABASE"; then
    echo "✅ Fresh database detected - running migrations normally"
    python manage.py migrate --noinput
else
    echo "⚠️ Existing database detected - handling custom user model migration"
    # Try normal migration first
    if python manage.py migrate --noinput 2>/dev/null; then
        echo "✅ Migrations completed successfully"
    else
        echo "🔄 Migration conflict detected, using --fake-initial strategy"
        python manage.py migrate --fake-initial --noinput
        echo "✅ Migrations resolved"
    fi
fi

echo "Static files already collected locally - skipping collectstatic..."
ls -la static/ || echo "Static directory listing failed"

echo "Creating superuser (if not exists)..."
python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()
from app.core.models import User

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
        email='venkatesh.k21062005@gmail.com', 
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
