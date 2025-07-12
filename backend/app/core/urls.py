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
    
    # Item Management endpoints
    path('items/', views.ItemListCreateView.as_view(), name='item_list_create'),
    path('items/<uuid:item_id>/', views.ItemDetailView.as_view(), name='item_detail'),
    path('users/me/items/', views.UserItemsView.as_view(), name='user_items'),
    
    # Transaction/Swap endpoints
    path('swaps/', views.TransactionListCreateView.as_view(), name='transaction_list_create'),
    path('swaps/<uuid:transaction_id>/', views.TransactionDetailView.as_view(), name='transaction_detail'),
    path('items/<uuid:item_id>/purchase/', views.ItemPurchaseView.as_view(), name='item_purchase'),
    
    # Rating endpoints
    path('users/<uuid:user_id>/rate/', views.RatingCreateView.as_view(), name='rating_create'),
    path('users/<uuid:user_id>/ratings/', views.UserRatingsView.as_view(), name='user_ratings'),
    
    # Image upload endpoint
    path('upload/images/', views.ImageUploadView.as_view(), name='image_upload'),
]
