from django.contrib import admin
from django.contrib.auth.models import User, Group

# Customize Django Admin Site
admin.site.site_header = "ReWear Admin Panel"
admin.site.site_title = "ReWear Administration"
admin.site.index_title = "Welcome to ReWear Community Clothing Exchange Admin"

# Unregister and re-register User model with custom admin
admin.site.unregister(User)
admin.site.unregister(Group)

@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined']
    list_filter = ['is_staff', 'is_active', 'date_joined']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering = ['-date_joined']

@admin.register(Group)
class CustomGroupAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']

# Register your models here.
# Example:
# @admin.register(YourModel)
# class YourModelAdmin(admin.ModelAdmin):
#     list_display = ['field1', 'field2', 'created_at']
#     list_filter = ['created_at']
#     search_fields = ['field1']
