# ReWear API Complete Testing Guide

## Overview
This comprehensive Postman collection tests all endpoints of the ReWear Community Clothing Exchange API. The collection includes 27 test cases covering authentication, user management, item management, transactions/swaps, ratings, and error handling.

## Files Included
1. `ReWear_API_Complete_Tests.postman_collection.json` - Complete test collection
2. `ReWear_API_Environment.postman_environment.json` - Environment variables
3. `API_Testing_Guide.md` - This guide

## API Endpoints Covered

### 1. Authentication (4 tests)
- **API Root** - `GET /api/` - Check API status and endpoints
- **User Registration** - `POST /api/auth/signup/` - Create new user account
- **User Login** - `POST /api/auth/login/` - Authenticate and get tokens
- **Admin Login** - `POST /api/auth/login/` - Admin authentication

### 2. User Profile Management (3 tests)
- **Get Current User Profile** - `GET /api/users/me/` - Get own profile
- **Update Current User Profile** - `PUT /api/users/me/` - Update profile info
- **Get Public User Profile** - `GET /api/users/{id}/` - View other users

### 3. Image Upload (1 test)
- **Upload Images** - `POST /api/upload/images/` - Upload item images

### 4. Item Management (6 tests)
- **Create New Item** - `POST /api/items/` - List new clothing item
- **Browse All Items** - `GET /api/items/` - View available items
- **Browse Items with Filters** - `GET /api/items/?filters` - Search/filter items
- **Get Item Details** - `GET /api/items/{id}/` - View item details
- **Update Item** - `PUT /api/items/{id}/` - Edit own items
- **Get My Items** - `GET /api/users/me/items/` - View own items

### 5. Transactions & Swaps (7 tests)
- **Create Swap Request** - `POST /api/swaps/` - Request item swap
- **Create Points Purchase Request** - `POST /api/swaps/` - Buy with points
- **Get My Swaps** - `GET /api/swaps/` - View transaction history
- **Get Transaction Details** - `GET /api/swaps/{id}/` - View transaction
- **Accept Transaction** - `PUT /api/swaps/{id}/` - Accept swap request
- **Complete Transaction** - `PUT /api/swaps/{id}/` - Mark as completed
- **Purchase Item with Points** - `POST /api/items/{id}/purchase/` - Direct purchase

### 6. Ratings (2 tests)
- **Rate User** - `POST /api/users/{id}/rate/` - Rate trading partner
- **Get User Ratings** - `GET /api/users/{id}/ratings/` - View user ratings

### 7. Error Handling (4 tests)
- **Test Invalid Login** - Invalid credentials test
- **Test Unauthorized Access** - No token authentication test
- **Test Item Not Found** - 404 error handling
- **Delete Item** - Remove item from listings

## Setup Instructions

### 1. Import Collections
1. Open Postman
2. Click "Import" → "Upload Files"
3. Select both JSON files:
   - `ReWear_API_Complete_Tests.postman_collection.json`
   - `ReWear_API_Environment.postman_environment.json`

### 2. Configure Environment
1. Select "ReWear API Environment" from environment dropdown
2. Verify base_url is set correctly:
   - Production: `https://rewear-community-clothing-exchange-production.up.railway.app`
   - Local: `http://localhost:8000`

### 3. Run Tests

#### Option A: Run Entire Collection
1. Click on "ReWear API Complete Tests" collection
2. Click "Run" button
3. Select all tests and click "Run ReWear API Complete Tests"

#### Option B: Run by Category
1. Navigate to specific folder (e.g., "Authentication")
2. Click "Run" for that folder only

#### Option C: Run Individual Tests
1. Click on any specific test
2. Click "Send" button
3. View results in "Test Results" tab

## Test Flow & Dependencies

### Recommended Test Order:
1. **Authentication** → Creates tokens for subsequent tests
2. **User Profile** → Verifies user management
3. **Image Upload** → Uploads test images (optional, if files available)
4. **Item Management** → Creates test items for transactions
5. **Transactions & Swaps** → Tests swap functionality
6. **Ratings** → Tests rating system
7. **Error Handling** → Validates error responses

### Auto-Generated Variables:
The tests automatically store important IDs for use in dependent tests:
- `access_token` - User authentication token
- `admin_access_token` - Admin authentication token
- `test_user_id` - User ID for profile tests
- `test_item_id` - Item ID for transaction tests
- `test_transaction_id` - Transaction ID for swap tests
- `test_image_url` - Uploaded image URL

## Expected Results

### Successful Test Run:
- ✅ All 27 tests should pass
- ✅ Status codes: 200 (success), 201 (created), 400/401/404 (expected errors)
- ✅ Response validation for required fields
- ✅ Auto-population of environment variables

### Common Issues:
1. **401 Unauthorized** - Check if tokens are properly set
2. **404 Not Found** - Verify item/user IDs are correctly stored
3. **400 Bad Request** - Check request body format
4. **Image Upload Fails** - Ensure image files are selected

## API Features Tested

### Authentication & Security:
- JWT token generation and validation
- Password hashing and verification
- Role-based access (user vs admin)
- Token refresh mechanism

### Item Management:
- CRUD operations on clothing items
- Image upload and management
- Search and filtering capabilities
- Category and condition management
- Points-based valuation

### Transaction System:
- Swap request creation and management
- Points-based purchases
- Transaction status tracking
- Accept/decline/complete workflow

### User System:
- Profile management
- Public vs private profile data
- Rating and review system
- Points balance tracking

### Error Handling:
- Proper HTTP status codes
- Validation error messages
- Authentication errors
- Resource not found errors

## Advanced Testing

### Load Testing:
```bash
# Run collection multiple times with delays
newman run ReWear_API_Complete_Tests.postman_collection.json \
  -e ReWear_API_Environment.postman_environment.json \
  --iteration-count 10 \
  --delay-request 1000
```

### Environment Switching:
1. Duplicate environment for local testing
2. Change `base_url` to `http://localhost:8000`
3. Run tests against local development server

### Custom Test Scenarios:
1. Create items with different categories
2. Test multiple user interactions
3. Verify points calculation
4. Test rating aggregation

## Troubleshooting

### Database Issues:
- Ensure PostgreSQL is running
- Check database migrations are applied
- Verify admin users exist

### Server Issues:
- Check Django server is running on correct port
- Verify CORS settings for frontend integration
- Check environment variables are set

### Authentication Issues:
- Verify JWT secret key configuration
- Check token expiration settings
- Ensure user accounts exist

## API Documentation

For detailed API documentation, visit the API root endpoint:
- Production: https://rewear-community-clothing-exchange-production.up.railway.app/api/
- Local: http://localhost:8000/api/

The API root provides:
- Available endpoints overview
- Admin credentials for testing
- System status information
- Version information

## Contributing

When adding new endpoints:
1. Add corresponding Postman tests
2. Update this documentation
3. Ensure proper error handling tests
4. Add environment variables as needed
5. Test both success and failure scenarios
