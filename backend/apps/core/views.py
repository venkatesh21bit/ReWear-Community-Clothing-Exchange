from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
import datetime


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """
    Simple health check endpoint to verify the API is working
    """
    try:
        # Test database connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        
        return Response({
            'status': 'healthy',
            'timestamp': datetime.datetime.now().isoformat(),
            'database': 'connected',
            'message': 'Django backend is running successfully'
        }, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({
            'status': 'unhealthy',
            'timestamp': datetime.datetime.now().isoformat(),
            'database': 'disconnected',
            'error': str(e),
            'message': 'Health check failed'
        }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
