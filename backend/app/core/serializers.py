from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import User, Item, ItemImage, Transaction, Rating


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
    """Serializer for user profile"""
    full_name = serializers.ReadOnlyField()
    average_rating = serializers.ReadOnlyField()
    member_since = serializers.DateTimeField(source='date_joined', read_only=True)
    
    class Meta:
        model = User
        fields = (
            'user_id', 'first_name', 'last_name', 'full_name', 'email',
            'points_balance', 'bio', 'location', 'avatar', 'phone_number',
            'total_swaps', 'items_listed', 'completed_swaps', 'ongoing_swaps',
            'average_rating', 'member_since', 'is_active'
        )
        read_only_fields = (
            'user_id', 'email', 'points_balance', 'total_swaps', 
            'items_listed', 'completed_swaps', 'ongoing_swaps'
        )


class UserPublicProfileSerializer(serializers.ModelSerializer):
    """Serializer for public user profile (limited fields)"""
    full_name = serializers.ReadOnlyField()
    average_rating = serializers.ReadOnlyField()
    join_date = serializers.DateTimeField(source='date_joined', read_only=True)
    
    class Meta:
        model = User
        fields = (
            'user_id', 'first_name', 'full_name', 'avatar', 'location',
            'average_rating', 'total_swaps', 'join_date'
        )


class ItemImageSerializer(serializers.ModelSerializer):
    """Serializer for item images"""
    class Meta:
        model = ItemImage
        fields = ('image_id', 'image', 'is_primary', 'alt_text')


class ItemSerializer(serializers.ModelSerializer):
    """Serializer for items"""
    uploader = UserPublicProfileSerializer(read_only=True)
    images = ItemImageSerializer(many=True, read_only=True)
    tag_list = serializers.ReadOnlyField()
    
    class Meta:
        model = Item
        fields = (
            'item_id', 'uploader', 'title', 'description', 'category',
            'type', 'size', 'condition', 'tags', 'tag_list', 'status',
            'brand', 'color', 'points_value', 'images', 'created_at', 'updated_at'
        )
        read_only_fields = ('item_id', 'uploader', 'created_at', 'updated_at')


class TransactionSerializer(serializers.ModelSerializer):
    """Serializer for transactions"""
    sender = UserPublicProfileSerializer(read_only=True)
    receiver = UserPublicProfileSerializer(read_only=True)
    item = ItemSerializer(read_only=True)
    
    class Meta:
        model = Transaction
        fields = (
            'transaction_id', 'sender', 'receiver', 'item', 'method',
            'status', 'points_amount', 'message', 'created_at',
            'updated_at', 'completed_at'
        )
        read_only_fields = (
            'transaction_id', 'sender', 'receiver', 'item', 
            'created_at', 'updated_at', 'completed_at'
        )


class RatingSerializer(serializers.ModelSerializer):
    """Serializer for ratings"""
    rater = UserPublicProfileSerializer(read_only=True)
    rated_user = UserPublicProfileSerializer(read_only=True)
    
    class Meta:
        model = Rating
        fields = (
            'rating_id', 'rater', 'rated_user', 'rating', 'comment',
            'created_at', 'updated_at'
        )
        read_only_fields = ('rating_id', 'rater', 'rated_user', 'created_at', 'updated_at')
