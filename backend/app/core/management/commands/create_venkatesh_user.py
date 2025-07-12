"""
Management command to create the venkatesh superuser
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Create venkatesh superuser account'

    def handle(self, *args, **options):
        User = get_user_model()
        
        # Create venkatesh superuser
        if not User.objects.filter(username='venkatesh').exists():
            User.objects.create_superuser(
                username='venkatesh',
                email='venkatesh@rewear.com', 
                password='venkat*2005',
                first_name='Venkatesh',
                last_name='User'
            )
            self.stdout.write(
                self.style.SUCCESS('✅ Successfully created venkatesh superuser')
            )
        else:
            self.stdout.write(
                self.style.WARNING('ℹ️ Venkatesh superuser already exists')
            )
            
        # Ensure user has staff privileges
        user = User.objects.get(username='venkatesh')
        if not user.is_staff:
            user.is_staff = True
            user.save()
            self.stdout.write(
                self.style.SUCCESS('✅ Updated venkatesh to have staff privileges')
            )
            
        # Display user info
        self.stdout.write(f'📋 Username: {user.username}')
        self.stdout.write(f'📧 Email: {user.email}')
        self.stdout.write(f'👑 Superuser: {user.is_superuser}')
        self.stdout.write(f'👤 Staff: {user.is_staff}')
        self.stdout.write(f'✅ Active: {user.is_active}')
