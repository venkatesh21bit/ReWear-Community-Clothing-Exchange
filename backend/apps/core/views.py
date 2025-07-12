from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
import datetime

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
        },
        'admin_credentials': {
            'username': 'admin',
            'password': 'admin123',
            'note': 'Default admin credentials for demo'
        },
        'status': 'operational'
    }, status=status.HTTP_200_OK)

# Add your API views here
# Example:
# @api_view(['GET'])
# @permission_classes([AllowAny])
# def example_view(request):
#     return Response({'message': 'Hello from ReWear API!'})
