from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
import datetime

from .models import User, Item, Transaction, Rating
from .serializers import (
    UserRegistrationSerializer, UserLoginSerializer, 
    UserProfileSerializer, UserPublicProfileSerializer
)

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
