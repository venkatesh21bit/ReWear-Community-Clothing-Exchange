from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
import uuid

# Extended User Model
class User(AbstractUser):
    """
    Extended User model for ReWear platform
    """
    USER_ROLES = [
        ('user', 'User'),
        ('admin', 'Admin'),
    ]
    
    # Basic Info
    user_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    
    # Platform specific fields
    points_balance = models.IntegerField(default=100)  # Starting points
    role = models.CharField(max_length=10, choices=USER_ROLES, default='user')
    is_suspended = models.BooleanField(default=False)
    
    # Profile fields
    bio = models.TextField(blank=True, null=True, max_length=500)
    location = models.CharField(max_length=100, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    
    # Stats (will be calculated fields)
    total_swaps = models.IntegerField(default=0)
    items_listed = models.IntegerField(default=0)
    completed_swaps = models.IntegerField(default=0)
    ongoing_swaps = models.IntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Override username field to use email
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    @property
    def average_rating(self):
        """Calculate average rating from all ratings received"""
        ratings = self.received_ratings.all()
        if ratings.exists():
            return round(ratings.aggregate(models.Avg('rating'))['rating__avg'], 1)
        return 0.0


class Item(models.Model):
    """
    Model for clothing items listed by users
    """
    ITEM_CATEGORIES = [
        ('tops', 'Tops'),
        ('bottoms', 'Bottoms'),
        ('outerwear', 'Outerwear'),
        ('shoes', 'Shoes'),
        ('accessories', 'Accessories'),
        ('dresses', 'Dresses'),
        ('activewear', 'Activewear'),
        ('formal', 'Formal Wear'),
        ('casual', 'Casual Wear'),
        ('other', 'Other'),
    ]
    
    ITEM_TYPES = [
        ('swap', 'Available for Swap'),
        ('donation', 'Donation'),
        ('points', 'Points Exchange'),
    ]
    
    ITEM_CONDITIONS = [
        ('new', 'New with Tags'),
        ('excellent', 'Excellent'),
        ('good', 'Good'),
        ('fair', 'Fair'),
        ('worn', 'Well Worn'),
    ]
    
    ITEM_SIZES = [
        ('xs', 'XS'),
        ('s', 'S'),
        ('m', 'M'),
        ('l', 'L'),
        ('xl', 'XL'),
        ('xxl', 'XXL'),
        ('one_size', 'One Size'),
        ('custom', 'Custom Size'),
    ]
    
    ITEM_STATUS = [
        ('available', 'Available'),
        ('pending', 'Pending Transaction'),
        ('swapped', 'Swapped'),
        ('donated', 'Donated'),
        ('removed', 'Removed'),
    ]
    
    # Primary fields
    item_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    uploader = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_items')
    
    # Item details
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    category = models.CharField(max_length=20, choices=ITEM_CATEGORIES)
    type = models.CharField(max_length=15, choices=ITEM_TYPES, default='swap')
    size = models.CharField(max_length=15, choices=ITEM_SIZES)
    condition = models.CharField(max_length=15, choices=ITEM_CONDITIONS)
    tags = models.CharField(max_length=500, blank=True, help_text="Comma-separated tags")
    status = models.CharField(max_length=15, choices=ITEM_STATUS, default='available')
    
    # Additional fields
    brand = models.CharField(max_length=100, blank=True, null=True)
    color = models.CharField(max_length=50, blank=True, null=True)
    points_value = models.IntegerField(default=0, help_text="Points required for exchange")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'items'
        verbose_name = 'Item'
        verbose_name_plural = 'Items'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} by {self.uploader.full_name}"
    
    @property
    def tag_list(self):
        """Return tags as a list"""
        return [tag.strip() for tag in self.tags.split(',') if tag.strip()]


class ItemImage(models.Model):
    """
    Model for storing multiple images for each item
    """
    image_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='item_images/')
    is_primary = models.BooleanField(default=False)
    alt_text = models.CharField(max_length=200, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'item_images'
        verbose_name = 'Item Image'
        verbose_name_plural = 'Item Images'
        ordering = ['-is_primary', 'created_at']
    
    def __str__(self):
        return f"Image for {self.item.title}"


class Transaction(models.Model):
    """
    Model for tracking swaps and point transactions
    """
    TRANSACTION_METHODS = [
        ('swap', 'Item Swap'),
        ('points', 'Points Exchange'),
        ('donation', 'Donation'),
    ]
    
    TRANSACTION_STATUS = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('disputed', 'Disputed'),
    ]
    
    # Primary fields
    transaction_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_transactions')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_transactions')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='transactions')
    
    # Transaction details
    method = models.CharField(max_length=15, choices=TRANSACTION_METHODS)
    status = models.CharField(max_length=15, choices=TRANSACTION_STATUS, default='pending')
    points_amount = models.IntegerField(default=0, help_text="Points involved in transaction")
    
    # Additional fields
    message = models.TextField(blank=True, null=True, max_length=500)
    admin_notes = models.TextField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'transactions'
        verbose_name = 'Transaction'
        verbose_name_plural = 'Transactions'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.method.title()} - {self.sender.full_name} to {self.receiver.full_name}"
    
    def complete_transaction(self):
        """Mark transaction as completed and update timestamps"""
        self.status = 'completed'
        self.completed_at = timezone.now()
        self.save()


class Rating(models.Model):
    """
    Model for user ratings and reviews
    """
    rating_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rater = models.ForeignKey(User, on_delete=models.CASCADE, related_name='given_ratings')
    rated_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_ratings')
    transaction = models.OneToOneField(Transaction, on_delete=models.CASCADE, related_name='rating', null=True, blank=True)
    
    # Rating details
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(max_length=500, blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'ratings'
        verbose_name = 'Rating'
        verbose_name_plural = 'Ratings'
        ordering = ['-created_at']
        unique_together = ['rater', 'rated_user', 'transaction']
    
    def __str__(self):
        return f"{self.rating}★ - {self.rater.full_name} rated {self.rated_user.full_name}"
