from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.core.files.storage import default_storage
from django.conf import settings
import datetime
import uuid

from .models import User, Item, ItemImage, Transaction, Rating
from .serializers import (
    UserRegistrationSerializer, UserLoginSerializer, 
    UserProfileSerializer, UserPublicProfileSerializer,
    ItemCreateSerializer, ItemListSerializer, ItemDetailSerializer,
    UserItemsSerializer, TransactionCreateSerializer, TransactionListSerializer,
    PurchaseSerializer, RatingCreateSerializer, RatingSerializer,
    ImageUploadSerializer
)


# ===============================
# Root API Endpoint
# ===============================

@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    """
    ReWear API Root Endpoint
    """
    return Response({
        'message': 'Welcome to ReWear Community Clothing Exchange API',
        'version': '1.0',
        'timestamp': datetime.datetime.now().isoformat(),
        'endpoints': {
            'admin': '/admin/ (Main Dashboard - Login required)',
            'api': '/api/ (API Endpoints)',
            'auth': {
                'login': '/api/auth/login/',
                'signup': '/api/auth/signup/',
                'profile': '/api/users/me/',
            },
            'items': {
                'browse': '/api/items/',
                'create': '/api/items/',
                'detail': '/api/items/{id}/',
                'my_items': '/api/users/me/items/',
            },
            'swaps': {
                'my_swaps': '/api/swaps/',
                'create_swap': '/api/swaps/',
                'purchase': '/api/items/{id}/purchase/',
            },
            'uploads': {
                'images': '/api/upload/images/',
            }
        },
        'admin_credentials': {
            'option_1': {
                'username': 'admin',
                'password': 'admin123'
            },
            'option_2': {
                'username': 'venkatesh', 
                'password': 'venkat*2005'
            },
            'note': 'Both accounts have superuser and staff privileges'
        },
        'status': 'operational'
    }, status=status.HTTP_200_OK)


# ===============================
# Authentication Views
# ===============================

class UserRegistrationView(APIView):
    """
    POST /api/auth/signup
    Register a new user
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'success': True,
                'message': 'User registered successfully',
                'user': {
                    'id': user.user_id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                }
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'message': 'Registration failed',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    """
    POST /api/auth/login
    Authenticate user and return JWT tokens
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'success': True,
                'message': 'Login successful',
                'token': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                },
                'user': {
                    'id': user.user_id,
                    'name': user.full_name,
                    'email': user.email,
                    'points': user.points_balance,
                    'location': user.location,
                    'avatar': user.avatar.url if user.avatar else None,
                    'member_since': user.date_joined,
                    'rating': user.average_rating,
                    'total_swaps': user.total_swaps,
                    'items_listed': user.items_listed,
                    'completed_swaps': user.completed_swaps,
                    'ongoing_swaps': user.ongoing_swaps,
                }
            }, status=status.HTTP_200_OK)
        return Response({
            'success': False,
            'message': 'Login failed',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


# ===============================
# User Profile Views
# ===============================

class CurrentUserProfileView(APIView):
    """
    GET /api/users/me - Get current user profile
    PUT /api/users/me - Update current user profile
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request):
        serializer = UserProfileSerializer(
            request.user, 
            data=request.data, 
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserPublicProfileView(APIView):
    """
    GET /api/users/:id - Get public profile of any user
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, user_id):
        user = get_object_or_404(User, user_id=user_id)
        serializer = UserPublicProfileSerializer(user)
        
        # Add some additional computed fields
        data = serializer.data
        data.update({
            'response_time': '< 1 hour',  # This could be calculated from message data
            'badges': [],  # Could be calculated based on user achievements
        })
        
        return Response(data, status=status.HTTP_200_OK)


# ===============================
# Item Management Views
# ===============================

class ItemListCreateView(APIView):
    """
    GET /api/items/ - Browse all items with filtering
    POST /api/items/ - Create a new item
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            queryset = Item.objects.filter(status='available').select_related('uploader').prefetch_related('images')
            
            # Apply filters
            category = request.query_params.get('category')
            if category:
                queryset = queryset.filter(category=category)
            
            size = request.query_params.get('size')
            if size:
                queryset = queryset.filter(size=size)
            
            condition = request.query_params.get('condition')
            if condition:
                queryset = queryset.filter(condition=condition)
            
            min_points = request.query_params.get('min_points')
            if min_points:
                queryset = queryset.filter(points_value__gte=min_points)
            
            max_points = request.query_params.get('max_points')
            if max_points:
                queryset = queryset.filter(points_value__lte=max_points)
            
            search = request.query_params.get('search')
            if search:
                queryset = queryset.filter(
                    Q(title__icontains=search) |
                    Q(description__icontains=search) |
                    Q(brand__icontains=search) |
                    Q(tags__icontains=search)
                )
            
            # Exclude user's own items
            queryset = queryset.exclude(uploader=request.user)
            
            # Order by newest first
            queryset = queryset.order_by('-created_at')
            
            serializer = ItemListSerializer(queryset, many=True, context={'request': request})
            
            return Response({
                'success': True,
                'count': queryset.count(),
                'results': serializer.data
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            # Add detailed error logging
            import traceback
            error_details = {
                'error': str(e),
                'traceback': traceback.format_exc(),
                'user_id': request.user.id if request.user else None
            }
            print(f"Error in ItemListCreateView.get: {error_details}")
            
            return Response({
                'success': False,
                'message': 'Failed to fetch items',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def post(self, request):
        serializer = ItemCreateSerializer(data=request.data)
        if serializer.is_valid():
            item = serializer.save(uploader=request.user)
            return Response({
                'success': True,
                'message': 'Item listed successfully',
                'item': ItemDetailSerializer(item, context={'request': request}).data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'message': 'Failed to create item',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class ItemDetailView(APIView):
    """
    GET /api/items/:id/ - Get detailed item information
    PUT /api/items/:id/ - Update item (owner only)
    DELETE /api/items/:id/ - Delete item (owner only)
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, item_id):
        item = get_object_or_404(Item, item_id=item_id)
        serializer = ItemDetailSerializer(item, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, item_id):
        item = get_object_or_404(Item, item_id=item_id)
        
        # Check if user owns the item
        if item.uploader != request.user:
            return Response({
                'success': False,
                'message': 'You can only edit your own items'
            }, status=status.HTTP_403_FORBIDDEN)
        
        serializer = ItemCreateSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            item = serializer.save()
            return Response({
                'success': True,
                'message': 'Item updated successfully',
                'item': ItemDetailSerializer(item, context={'request': request}).data
            }, status=status.HTTP_200_OK)
        return Response({
            'success': False,
            'message': 'Failed to update item',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, item_id):
        item = get_object_or_404(Item, item_id=item_id)
        
        # Check if user owns the item
        if item.uploader != request.user:
            return Response({
                'success': False,
                'message': 'You can only delete your own items'
            }, status=status.HTTP_403_FORBIDDEN)
        
        item.status = 'deleted'
        item.save()
        
        return Response({
            'success': True,
            'message': 'Item deleted successfully'
        }, status=status.HTTP_200_OK)


class UserItemsView(APIView):
    """
    GET /api/users/me/items/ - Get current user's items
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        queryset = Item.objects.filter(uploader=request.user).prefetch_related('images').order_by('-created_at')
        
        # Filter by status if provided
        status_filter = request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        serializer = UserItemsSerializer(queryset, many=True, context={'request': request})
        
        return Response({
            'success': True,
            'count': queryset.count(),
            'results': serializer.data
        }, status=status.HTTP_200_OK)


# ===============================
# Transaction/Swap Views
# ===============================

class TransactionListCreateView(APIView):
    """
    GET /api/swaps/ - Get user's transactions/swaps
    POST /api/swaps/ - Create a new swap request
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Get transactions where user is either sender or receiver
        queryset = Transaction.objects.filter(
            Q(sender=request.user) | Q(receiver=request.user)
        ).select_related('sender', 'receiver', 'item').order_by('-created_at')
        
        # Filter by status if provided
        status_filter = request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        serializer = TransactionListSerializer(queryset, many=True, context={'request': request})
        
        return Response({
            'success': True,
            'count': queryset.count(),
            'results': serializer.data
        }, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = TransactionCreateSerializer(data=request.data)
        if serializer.is_valid():
            requested_item = get_object_or_404(Item, item_id=serializer.validated_data['requested_item_id'])
            
            # Check if user is trying to swap with their own item
            if requested_item.uploader == request.user:
                return Response({
                    'success': False,
                    'message': 'You cannot swap with your own items'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Check if item is available
            if requested_item.status != 'available':
                return Response({
                    'success': False,
                    'message': 'This item is no longer available'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Create transaction
            transaction = Transaction.objects.create(
                sender=request.user,
                receiver=requested_item.uploader,
                item=requested_item,
                method=serializer.validated_data['method'],
                message=serializer.validated_data.get('message', ''),
                points_amount=serializer.validated_data.get('points_amount', 0),
                status='pending'
            )
            
            return Response({
                'success': True,
                'message': 'Swap request sent successfully',
                'transaction': TransactionListSerializer(transaction, context={'request': request}).data
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'success': False,
            'message': 'Failed to create swap request',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class TransactionDetailView(APIView):
    """
    GET /api/swaps/:id/ - Get transaction details
    PUT /api/swaps/:id/ - Update transaction status (accept/decline)
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, transaction_id):
        transaction = get_object_or_404(Transaction, transaction_id=transaction_id)
        
        # Check if user is involved in this transaction
        if transaction.sender != request.user and transaction.receiver != request.user:
            return Response({
                'success': False,
                'message': 'Transaction not found'
            }, status=status.HTTP_404_NOT_FOUND)
            
        serializer = TransactionListSerializer(transaction, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, transaction_id):
        transaction = get_object_or_404(Transaction, transaction_id=transaction_id)
        
        # Check if user is involved in this transaction
        if transaction.sender != request.user and transaction.receiver != request.user:
            return Response({
                'success': False,
                'message': 'Transaction not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        action = request.data.get('action')  # 'accept', 'decline', 'complete'
        
        if action == 'accept' and transaction.receiver == request.user:
            transaction.status = 'accepted'
            transaction.save()
            
            # Mark the item as swapped
            transaction.item.status = 'swapped'
            transaction.item.save()
            
            return Response({
                'success': True,
                'message': 'Swap request accepted'
            }, status=status.HTTP_200_OK)
        
        elif action == 'decline' and transaction.receiver == request.user:
            transaction.status = 'declined'
            transaction.save()
            
            return Response({
                'success': True,
                'message': 'Swap request declined'
            }, status=status.HTTP_200_OK)
        
        elif action == 'complete':
            transaction.status = 'completed'
            transaction.completed_at = datetime.datetime.now()
            transaction.save()
            
            return Response({
                'success': True,
                'message': 'Transaction marked as completed'
            }, status=status.HTTP_200_OK)
        
        return Response({
            'success': False,
            'message': 'Invalid action or insufficient permissions'
        }, status=status.HTTP_400_BAD_REQUEST)


class ItemPurchaseView(APIView):
    """
    POST /api/items/:id/purchase/ - Purchase an item with points or currency
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request, item_id):
        item = get_object_or_404(Item, item_id=item_id)
        
        # Check if user owns the item
        if item.uploader == request.user:
            return Response({
                'success': False,
                'message': 'You cannot purchase your own item'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if item is available
        if item.status != 'available':
            return Response({
                'success': False,
                'message': 'This item is no longer available'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = PurchaseSerializer(data=request.data)
        if serializer.is_valid():
            mode = serializer.validated_data['mode']
            
            if mode == 'points':
                points_used = serializer.validated_data['points_used']
                
                # Check if user has enough points
                if request.user.points_balance < points_used:
                    return Response({
                        'success': False,
                        'message': 'Insufficient points balance'
                    }, status=status.HTTP_400_BAD_REQUEST)
                
                # Deduct points from buyer, add to seller
                request.user.points_balance -= points_used
                request.user.save()
                
                item.uploader.points_balance += points_used
                item.uploader.save()
                
                # Create transaction record
                transaction = Transaction.objects.create(
                    sender=request.user,
                    receiver=item.uploader,
                    item=item,
                    method='points',
                    points_amount=points_used,
                    status='completed',
                    completed_at=datetime.datetime.now()
                )
                
                # Mark item as sold
                item.status = 'sold'
                item.save()
                
                return Response({
                    'success': True,
                    'message': f'Item purchased successfully for {points_used} points',
                    'transaction': TransactionListSerializer(transaction, context={'request': request}).data
                }, status=status.HTTP_200_OK)
            
            else:  # currency mode
                # TODO: Implement payment gateway integration
                return Response({
                    'success': False,
                    'message': 'Currency payments not yet implemented'
                }, status=status.HTTP_501_NOT_IMPLEMENTED)
        
        return Response({
            'success': False,
            'message': 'Invalid purchase data',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


# ===============================
# Rating Views
# ===============================

class RatingCreateView(APIView):
    """
    POST /api/users/:id/rate/ - Rate a user after a transaction
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request, user_id):
        rated_user = get_object_or_404(User, user_id=user_id)
        
        # Check if user is trying to rate themselves
        if rated_user == request.user:
            return Response({
                'success': False,
                'message': 'You cannot rate yourself'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user has already rated this user
        existing_rating = Rating.objects.filter(rater=request.user, rated_user=rated_user).first()
        if existing_rating:
            return Response({
                'success': False,
                'message': 'You have already rated this user'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = RatingCreateSerializer(data=request.data)
        if serializer.is_valid():
            rating = serializer.save(rater=request.user, rated_user=rated_user)
            
            return Response({
                'success': True,
                'message': 'Rating submitted successfully',
                'rating': RatingSerializer(rating).data
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'success': False,
            'message': 'Failed to submit rating',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class UserRatingsView(APIView):
    """
    GET /api/users/:id/ratings/ - Get all ratings for a user
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, user_id):
        user = get_object_or_404(User, user_id=user_id)
        ratings = Rating.objects.filter(rated_user=user).select_related('rater').order_by('-created_at')
        
        serializer = RatingSerializer(ratings, many=True)
        
        return Response({
            'success': True,
            'count': ratings.count(),
            'average_rating': user.average_rating,
            'results': serializer.data
        }, status=status.HTTP_200_OK)


# ===============================
# Image Upload Views
# ===============================

class ImageUploadView(APIView):
    """
    POST /api/upload/images/ - Upload images for items
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            uploaded_images = []
            
            for image in serializer.validated_data['images']:
                # Generate unique filename
                ext = image.name.split('.')[-1]
                filename = f"items/{uuid.uuid4()}.{ext}"
                
                # Save image
                path = default_storage.save(filename, image)
                url = default_storage.url(path)
                
                uploaded_images.append({
                    'filename': filename,
                    'url': request.build_absolute_uri(url)
                })
            
            return Response({
                'success': True,
                'message': f'{len(uploaded_images)} images uploaded successfully',
                'images': uploaded_images
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'success': False,
            'message': 'Failed to upload images',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


# ===============================
# Debug View (Temporary)
# ===============================

class ItemDebugView(APIView):
    """
    Temporary debug view to isolate the 500 error
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            # Test basic Item query
            items_count = Item.objects.count()
            available_items_count = Item.objects.filter(status='available').count()
            
            # Test if there are any items at all
            if items_count == 0:
                return Response({
                    'debug': 'No items in database',
                    'items_count': items_count
                })
            
            # Test basic queryset without relationships
            basic_queryset = Item.objects.filter(status='available')[:5]
            basic_items = list(basic_queryset.values('item_id', 'title', 'status'))
            
            # Test with uploader relationship
            try:
                with_uploader = Item.objects.filter(status='available').select_related('uploader')[:1]
                uploader_test = list(with_uploader.values('item_id', 'title', 'uploader__email'))
            except Exception as e:
                uploader_test = f"Error with uploader: {str(e)}"
            
            # Test with images relationship
            try:
                with_images = Item.objects.filter(status='available').prefetch_related('images')[:1]
                images_test = "Images relationship works"
            except Exception as e:
                images_test = f"Error with images: {str(e)}"
            
            return Response({
                'debug_info': {
                    'total_items': items_count,
                    'available_items': available_items_count,
                    'basic_items': basic_items,
                    'uploader_test': uploader_test,
                    'images_test': images_test,
                    'user_id': request.user.id
                }
            })
            
        except Exception as e:
            import traceback
            return Response({
                'debug_error': str(e),
                'traceback': traceback.format_exc()
            }, status=500)
