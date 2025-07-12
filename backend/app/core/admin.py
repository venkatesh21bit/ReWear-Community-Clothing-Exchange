from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Item, ItemImage, Transaction, Rating

# Customize Django Admin Site
admin.site.site_header = "ReWear Admin Panel"
admin.site.site_title = "ReWear Administration"
admin.site.index_title = "Welcome to ReWear Community Clothing Exchange Admin"

# Unregister default Group model
admin.site.unregister(Group)


@admin.register(User)
class CustomUserAdmin(BaseUserAdmin):
    list_display = ['email', 'first_name', 'last_name', 'points_balance', 'role', 'is_staff', 'is_active', 'date_joined']
    list_filter = ['role', 'is_staff', 'is_active', 'is_suspended', 'date_joined']
    search_fields = ['email', 'first_name', 'last_name', 'username']
    ordering = ['-date_joined']
    
    # Configure login field for admin
    username_field = 'email'
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'bio', 'location', 'avatar', 'phone_number')}),
        ('Platform info', {'fields': ('points_balance', 'role', 'total_swaps', 'items_listed', 'completed_swaps', 'ongoing_swaps')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_suspended', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )


class ItemImageInline(admin.TabularInline):
    model = ItemImage
    extra = 1
    fields = ['image', 'is_primary', 'alt_text']


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'uploader', 'category', 'type', 'condition', 'status', 'points_value', 'created_at']
    list_filter = ['category', 'type', 'condition', 'status', 'created_at']
    search_fields = ['title', 'description', 'uploader__first_name', 'uploader__last_name', 'brand']
    ordering = ['-created_at']
    inlines = [ItemImageInline]
    
    fieldsets = (
        (None, {'fields': ('uploader', 'title', 'description')}),
        ('Item Details', {'fields': ('category', 'type', 'size', 'condition', 'brand', 'color')}),
        ('Status & Pricing', {'fields': ('status', 'points_value', 'tags')}),
    )
    
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['transaction_id', 'sender', 'receiver', 'item', 'method', 'status', 'points_amount', 'created_at']
    list_filter = ['method', 'status', 'created_at']
    search_fields = ['sender__first_name', 'sender__last_name', 'receiver__first_name', 'receiver__last_name', 'item__title']
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {'fields': ('sender', 'receiver', 'item')}),
        ('Transaction Details', {'fields': ('method', 'status', 'points_amount', 'message')}),
        ('Admin', {'fields': ('admin_notes',)}),
        ('Timestamps', {'fields': ('created_at', 'updated_at', 'completed_at')}),
    )
    
    readonly_fields = ['transaction_id', 'created_at', 'updated_at']


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ['rater', 'rated_user', 'rating', 'transaction', 'created_at']
    list_filter = ['rating', 'created_at']
    search_fields = ['rater__first_name', 'rater__last_name', 'rated_user__first_name', 'rated_user__last_name']
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {'fields': ('rater', 'rated_user', 'transaction')}),
        ('Rating Details', {'fields': ('rating', 'comment')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )
    
    readonly_fields = ['rating_id', 'created_at', 'updated_at']


@admin.register(ItemImage)
class ItemImageAdmin(admin.ModelAdmin):
    list_display = ['item', 'is_primary', 'created_at']
    list_filter = ['is_primary', 'created_at']
    search_fields = ['item__title', 'alt_text']
    ordering = ['-created_at']
