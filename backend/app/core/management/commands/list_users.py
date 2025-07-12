"""
Management command to list all users and their permissions
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'List all users and their permissions'

    def handle(self, *args, **options):
        User = get_user_model()
        
        users = User.objects.all()
        
        if not users.exists():
            self.stdout.write(self.style.WARNING('No users found in database'))
            return
            
        self.stdout.write('👥 All Users in Database:')
        self.stdout.write('-' * 50)
        
        for user in users:
            self.stdout.write(f'Username: {user.username}')
            self.stdout.write(f'Email: {user.email}')
            self.stdout.write(f'Superuser: {user.is_superuser}')
            self.stdout.write(f'Staff: {user.is_staff}')
            self.stdout.write(f'Active: {user.is_active}')
            self.stdout.write(f'Date Joined: {user.date_joined}')
            self.stdout.write('-' * 30)
            
        # Count summary
        total_users = users.count()
        superusers = users.filter(is_superuser=True).count()
        staff_users = users.filter(is_staff=True).count()
        active_users = users.filter(is_active=True).count()
        
        self.stdout.write(f'📊 Summary:')
        self.stdout.write(f'Total Users: {total_users}')
        self.stdout.write(f'Superusers: {superusers}')
        self.stdout.write(f'Staff Users: {staff_users}')
        self.stdout.write(f'Active Users: {active_users}')
