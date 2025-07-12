from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_root, name='api_root'),
    # Add your API endpoints here
    # Example:
    # path('example/', views.example_view, name='example'),
]
