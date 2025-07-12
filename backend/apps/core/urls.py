from django.urls import path
from . import views

urlpatterns = [
    # API Root
    path('', views.api_root, name='api_root'),
    
    # Authentication endpoints
    path('auth/signup/', views.UserRegistrationView.as_view(), name='user_signup'),
    path('auth/login/', views.UserLoginView.as_view(), name='user_login'),
    
    # User profile endpoints
    path('users/me/', views.CurrentUserProfileView.as_view(), name='current_user_profile'),
    path('users/<uuid:user_id>/', views.UserPublicProfileView.as_view(), name='user_public_profile'),
]
