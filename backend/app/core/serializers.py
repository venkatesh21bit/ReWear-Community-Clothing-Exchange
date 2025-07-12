from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import User, Item, ItemImage, Transaction, Rating


# ===============================
# User Serializers
# ===============================

class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password', 'password_confirm')
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        user = User.objects.create_user(
            username=validated_data['email'],
            password=password,
            **validated_data
        )
        return user


class UserLoginSerializer(serializers.Serializer):
    """Serializer for user login"""
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            user = authenticate(username=email, password=password)
            if not user:
                raise serializers.ValidationError('Invalid credentials')
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled')
            if user.is_suspended:
                raise serializers.ValidationError('User account is suspended')
            attrs['user'] = user
            return attrs
        else:
            raise serializers.ValidationError('Must include email and password')


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profile (current user)"""
    full_name = serializers.ReadOnlyField()
    average_rating = serializers.ReadOnlyField()
    
    class Meta:
        model = User
        fields = (
            'user_id', 'first_name', 'last_name', 'full_name', 'email', 
            'bio', 'location', 'avatar', 'phone_number', 'points_balance',
            'role', 'total_swaps', 'items_listed', 'completed_swaps', 
            'ongoing_swaps', 'average_rating', 'created_at', 'updated_at'
        )
        read_only_fields = (
            'user_id', 'full_name', 'email', 'points_balance', 'role',
            'total_swaps', 'items_listed', 'completed_swaps', 'ongoing_swaps',
            'average_rating', 'created_at', 'updated_at'
        )


class UserPublicProfileSerializer(serializers.ModelSerializer):
    """Serializer for public user profile (excluding sensitive data)"""
    full_name = serializers.ReadOnlyField()
    average_rating = serializers.ReadOnlyField()
    
    class Meta:
        model = User
        fields = (
            'user_id', 'first_name', 'last_name', 'full_name', 'bio', 
            'location', 'avatar', 'total_swaps', 'completed_swaps',
            'average_rating', 'created_at'
        )


# ===============================
# Item Serializers
# ===============================

class ItemImageSerializer(serializers.ModelSerializer):
    """Serializer for item images"""
    
    class Meta:
        model = ItemImage
        fields = ('image_id', 'image', 'is_primary', 'alt_text', 'created_at')
        read_only_fields = ('image_id', 'created_at')


class ItemCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new items"""
    tags = serializers.CharField(required=False, allow_blank=True)
    images = serializers.ListField(
        child=serializers.CharField(), 
        write_only=True, 
        required=False,
        help_text="List of image URLs from upload endpoint"
    )
    
    class Meta:
        model = Item
        fields = (
            'title', 'description', 'category', 'type', 'size', 'condition',
            'brand', 'color', 'points_value', 'tags', 'images'
        )
    
    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        item = Item.objects.create(**validated_data)
        
        # Create item images if provided
        for i, image_url in enumerate(images_data):
            ItemImage.objects.create(
                item=item,
                image=image_url,
                is_primary=(i == 0)  # First image is primary
            )
        
        return item


class ItemListSerializer(serializers.ModelSerializer):
    """Serializer for item listing (browse items)"""
    uploader = UserPublicProfileSerializer(read_only=True)
    images = ItemImageSerializer(many=True, read_only=True)
    primary_image = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    
    class Meta:
        model = Item
        fields = (
            'item_id', 'title', 'primary_image', 'condition', 'points_value',
            'category', 'size', 'brand', 'likes_count', 'is_liked', 'uploader',
            'created_at', 'status', 'images'
        )
    
    def get_primary_image(self, obj):
        primary_image = obj.images.filter(is_primary=True).first()
        if primary_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(primary_image.image.url)
            return primary_image.image.url
        return None
    
    def get_likes_count(self, obj):
        # TODO: Implement likes functionality
        return 0
    
    def get_is_liked(self, obj):
        # TODO: Implement likes functionality
        return False


class ItemDetailSerializer(serializers.ModelSerializer):
    """Serializer for detailed item view"""
    uploader = UserPublicProfileSerializer(read_only=True)
    images = ItemImageSerializer(many=True, read_only=True)
    tag_list = serializers.ReadOnlyField()
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    views_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Item
        fields = (
            'item_id', 'uploader', 'title', 'description', 'category',
            'type', 'size', 'condition', 'brand', 'color', 'points_value',
            'tags', 'tag_list', 'status', 'images', 'likes_count', 'is_liked',
            'views_count', 'created_at', 'updated_at'
        )
    
    def get_likes_count(self, obj):
        # TODO: Implement likes functionality
        return 0
    
    def get_is_liked(self, obj):
        # TODO: Implement likes functionality
        return False
    
    def get_views_count(self, obj):
        # TODO: Implement views tracking
        return 0


class UserItemsSerializer(serializers.ModelSerializer):
    """Serializer for user's own items (My Items)"""
    images = ItemImageSerializer(many=True, read_only=True)
    primary_image = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    views_count = serializers.SerializerMethodField()
    messages_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Item
        fields = (
            'item_id', 'title', 'primary_image', 'status', 'views_count',
            'likes_count', 'messages_count', 'created_at', 'points_value',
            'condition'
        )
    
    def get_primary_image(self, obj):
        primary_image = obj.images.filter(is_primary=True).first()
        if primary_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(primary_image.image.url)
            return primary_image.image.url
        return None
    
    def get_likes_count(self, obj):
        # TODO: Implement likes functionality
        return 0
    
    def get_views_count(self, obj):
        # TODO: Implement views tracking
        return 0
    
    def get_messages_count(self, obj):
        # TODO: Implement messaging functionality
        return 0


# ===============================
# Transaction Serializers
# ===============================

class TransactionCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating transactions (swaps)"""
    requested_item_id = serializers.UUIDField(write_only=True)
    offered_item_id = serializers.UUIDField(write_only=True, required=False, allow_null=True)
    
    class Meta:
        model = Transaction
        fields = ('requested_item_id', 'offered_item_id', 'method', 'message', 'points_amount')
    
    def validate(self, attrs):
        method = attrs.get('method')
        offered_item_id = attrs.get('offered_item_id')
        points_amount = attrs.get('points_amount', 0)
        
        if method == 'swap' and not offered_item_id:
            raise serializers.ValidationError("Offered item is required for swap transactions")
        
        if method == 'points' and points_amount <= 0:
            raise serializers.ValidationError("Points amount must be greater than 0 for points transactions")
        
        return attrs


class TransactionListSerializer(serializers.ModelSerializer):
    """Serializer for transaction list (user's swaps)"""
    sender = UserPublicProfileSerializer(read_only=True)
    receiver = UserPublicProfileSerializer(read_only=True)
    item = ItemListSerializer(read_only=True)
    partner = serializers.SerializerMethodField()
    my_item = serializers.SerializerMethodField()
    their_item = serializers.SerializerMethodField()
    
    class Meta:
        model = Transaction
        fields = (
            'transaction_id', 'method', 'status', 'my_item', 'their_item',
            'partner', 'points_amount', 'created_at', 'updated_at'
        )
    
    def get_partner(self, obj):
        request_user = self.context['request'].user
        if obj.sender == request_user:
            return UserPublicProfileSerializer(obj.receiver).data
        else:
            return UserPublicProfileSerializer(obj.sender).data
    
    def get_my_item(self, obj):
        request_user = self.context['request'].user
        if obj.sender == request_user:
            # For the sender, their item might be the offered item in the transaction
            # TODO: Implement proper item tracking for swaps
            return None
        else:
            return ItemListSerializer(obj.item, context=self.context).data
    
    def get_their_item(self, obj):
        request_user = self.context['request'].user
        if obj.sender == request_user:
            return ItemListSerializer(obj.item, context=self.context).data
        else:
            # For the receiver, their item might be the offered item
            # TODO: Implement proper item tracking for swaps
            return None


class PurchaseSerializer(serializers.Serializer):
    """Serializer for item purchase"""
    mode = serializers.ChoiceField(choices=['currency', 'points'])
    amount = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    points_used = serializers.IntegerField(required=False)
    
    def validate(self, attrs):
        mode = attrs.get('mode')
        
        if mode == 'currency' and not attrs.get('amount'):
            raise serializers.ValidationError("Amount is required for currency purchases")
        
        if mode == 'points' and not attrs.get('points_used'):
            raise serializers.ValidationError("Points amount is required for points purchases")
        
        return attrs


# ===============================
# Rating Serializers
# ===============================

class RatingCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating ratings"""
    
    class Meta:
        model = Rating
        fields = ('rating', 'comment')
    
    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value


class RatingSerializer(serializers.ModelSerializer):
    """Serializer for rating display"""
    rater = UserPublicProfileSerializer(read_only=True)
    rated_user = UserPublicProfileSerializer(read_only=True)
    
    class Meta:
        model = Rating
        fields = (
            'rating_id', 'rater', 'rated_user', 'rating', 'comment',
            'created_at', 'updated_at'
        )
        read_only_fields = ('rating_id', 'rater', 'rated_user', 'created_at', 'updated_at')


# ===============================
# Image Upload Serializer
# ===============================

class ImageUploadSerializer(serializers.Serializer):
    """Serializer for image upload"""
    images = serializers.ListField(
        child=serializers.ImageField(),
        allow_empty=False,
        max_length=10
    )
    
    def validate_images(self, value):
        if len(value) > 10:
            raise serializers.ValidationError("Maximum 10 images allowed")
        
        for image in value:
            if image.size > 5 * 1024 * 1024:  # 5MB limit
                raise serializers.ValidationError("Each image must be less than 5MB")
        
        return value
