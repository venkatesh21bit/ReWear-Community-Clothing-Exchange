#!/usr/bin/env python
"""
Quick test to verify the ItemListSerializer is correctly configured
"""
import os
import sys
import django

# Add the project root to the path
sys.path.append(os.path.join(os.path.dirname(__file__)))

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Setup Django
django.setup()

# Now test the serializer
from app.core.serializers import ItemListSerializer

# Check the fields
print("ItemListSerializer fields:")
serializer = ItemListSerializer()
print(f"Declared fields: {list(serializer.fields.keys())}")
print(f"Meta fields: {serializer.Meta.fields}")

# Check if 'images' is in both
if 'images' in serializer.fields and 'images' in serializer.Meta.fields:
    print("✅ SUCCESS: 'images' field is properly configured")
else:
    print("❌ ERROR: 'images' field configuration mismatch")
    print(f"In declared fields: {'images' in serializer.fields}")
    print(f"In Meta fields: {'images' in serializer.Meta.fields}")
