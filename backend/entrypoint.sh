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

# Create admin superuser
admin_email = 'admin@rewear.com'
if not User.objects.filter(email=admin_email).exists():
    admin_user = User.objects.create_superuser(
        username='admin',
        email=admin_email, 
        password='admin123',
        first_name='Admin',
        last_name='User'
    )
    admin_user.is_staff = True
    admin_user.is_superuser = True
    admin_user.save()
    print(f'✅ Admin superuser created: {admin_email} / admin123')
else:
    admin_user = User.objects.get(email=admin_email)
    admin_user.is_staff = True
    admin_user.is_superuser = True
    admin_user.save()
    print(f'✅ Admin user already exists: {admin_email}')

# Create venkatesh superuser  
venkatesh_email = 'venkatesh.k21062005@gmail.com'
if not User.objects.filter(email=venkatesh_email).exists():
    venkatesh_user = User.objects.create_superuser(
        username='venkatesh',
        email=venkatesh_email, 
        password='venkat*2005',
        first_name='Venkatesh',
        last_name='User'
    )
    venkatesh_user.is_staff = True
    venkatesh_user.is_superuser = True
    venkatesh_user.save()
    print(f'✅ Venkatesh superuser created: {venkatesh_email} / venkat*2005')
else:
    venkatesh_user = User.objects.get(email=venkatesh_email)
    venkatesh_user.is_staff = True
    venkatesh_user.is_superuser = True
    venkatesh_user.save()
    print(f'✅ Venkatesh user already exists: {venkatesh_email}')

# Verify superusers
superusers = User.objects.filter(is_superuser=True)
print(f'📋 Available superusers: {[f\"{user.email}({user.username})\" for user in superusers]}')

# Test password verification
print('🔐 Testing password verification...')
for email in [admin_email, venkatesh_email]:
    try:
        user = User.objects.get(email=email)
        password = 'admin123' if 'admin' in email else 'venkat*2005'
        if user.check_password(password):
            print(f'✅ Password verification SUCCESS for {email}')
        else:
            print(f'❌ Password verification FAILED for {email}')
            # Reset password
            user.set_password(password)
            user.save()
            print(f'🔄 Password reset for {email}')
    except User.DoesNotExist:
        print(f'❌ User not found: {email}')
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
