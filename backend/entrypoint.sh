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

print('📊 Checking existing users...')
all_users = User.objects.all()
print(f'Total users in database: {all_users.count()}')
for user in all_users:
    print(f'  - {user.username} | {user.email} | staff: {user.is_staff} | superuser: {user.is_superuser}')

# Remove venkatesh user if it exists
try:
    venkatesh_user = User.objects.get(username='venkatesh')
    venkatesh_user.delete()
    print('🗑️ Removed venkatesh user')
except User.DoesNotExist:
    print('ℹ️ No venkatesh user to remove')

# Update existing users instead of creating new ones
print('🔧 Ensuring admin privileges for admin user...')

# Handle admin user only
try:
    admin_user = User.objects.get(username='admin')
    admin_user.is_staff = True
    admin_user.is_superuser = True
    if admin_user.email != 'admin@rewear.com':
        print(f'📧 Updating admin email from {admin_user.email} to admin@rewear.com')
        admin_user.email = 'admin@rewear.com'
    admin_user.set_password('admin123')  # Ensure password is correct
    admin_user.save()
    print(f'✅ Admin user updated: {admin_user.email} / admin123')
except User.DoesNotExist:
    admin_user = User.objects.create_superuser(
        username='admin',
        email='admin@rewear.com', 
        password='admin123',
        first_name='Admin',
        last_name='User'
    )
    print(f'✅ Admin superuser created: admin@rewear.com / admin123')

# Final verification
print('🔍 Final user verification...')
all_users = User.objects.all()
for user in all_users:
    print(f'  - {user.username} | {user.email} | staff: {user.is_staff} | superuser: {user.is_superuser}')

print('🔐 Testing admin password verification...')
try:
    user = User.objects.get(email='admin@rewear.com')
    if user.check_password('admin123'):
        print(f'✅ Login should work: admin@rewear.com / admin123')
    else:
        print(f'❌ Password verification failed for admin@rewear.com')
    
    # Also test authentication the way Django admin does it
    from django.contrib.auth import authenticate
    auth_user = authenticate(username='admin@rewear.com', password='admin123')
    if auth_user:
        print(f'✅ Django authenticate() works with email as username')
    else:
        print(f'❌ Django authenticate() failed with email as username')
        
except User.DoesNotExist:
    print(f'❌ Admin user not found')
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
