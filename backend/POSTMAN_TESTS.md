# ReWear API Postman Tests

Complete Postman collection for testing the ReWear Community Clothing Exchange API.

## 📁 Files Included

1. **ReWear_API_Tests.postman_collection.json** - Main test collection
2. **ReWear_API_Environment.postman_environment.json** - Environment variables

## 🚀 Quick Setup

### 1. Import into Postman

1. Open Postman
2. Click **Import** button
3. Drag and drop both JSON files or click **Upload Files**
4. Select both files:
   - `ReWear_API_Tests.postman_collection.json`
   - `ReWear_API_Environment.postman_environment.json`

### 2. Select Environment

1. In Postman, click the environment dropdown (top right)
2. Select **ReWear API Environment**
3. The `base_url` is pre-configured for production

### 3. Run Tests

You can run tests individually or as a collection:

**Run Individual Tests:**
- Click on any request in the collection
- Click **Send**
- Check the **Test Results** tab

**Run Entire Collection:**
- Right-click on **ReWear API Tests** collection
- Select **Run collection**
- Click **Run ReWear API Tests**

## 🧪 Test Coverage

### Authentication Tests
- ✅ User Registration (Signup)
- ✅ User Login
- ✅ Admin Login
- ✅ Token Refresh
- ✅ Invalid Login (Error handling)
- ✅ Unauthorized Access (Error handling)

### User Profile Tests
- ✅ Get Current User Profile
- ✅ Update Current User Profile
- ✅ Get Public User Profile

### API Structure Tests
- ✅ API Root endpoint

## 🔧 Environment Variables

The tests automatically manage these variables:

| Variable | Description | Auto-populated |
|----------|-------------|----------------|
| `base_url` | API base URL | ✅ |
| `access_token` | JWT access token | ✅ |
| `refresh_token` | JWT refresh token | ✅ |
| `admin_access_token` | Admin JWT access token | ✅ |
| `admin_refresh_token` | Admin JWT refresh token | ✅ |
| `test_user_email` | Test user email | ✅ |
| `test_user_id` | Test user UUID | ✅ |

## 📋 Test Execution Order

**Recommended order for manual testing:**

1. **API Root** - Verify API is running
2. **User Registration** - Creates test user and stores tokens
3. **User Login** - Verifies login and updates tokens
4. **Get Current User Profile** - Tests authenticated access
5. **Update Current User Profile** - Tests profile updates
6. **Get Public User Profile** - Tests public profile access
7. **Admin Login** - Tests admin authentication
8. **Token Refresh** - Tests token refresh functionality
9. **Test Invalid Login** - Tests error handling
10. **Test Unauthorized Access** - Tests security

## 🔍 Test Assertions

Each test includes multiple assertions:

### Status Code Checks
- ✅ `200 OK` for successful requests
- ✅ `201 Created` for user registration
- ✅ `401 Unauthorized` for invalid auth

### Response Structure Checks
- ✅ Required fields present
- ✅ Correct data types
- ✅ Token format validation
- ✅ Security (no sensitive data in public profiles)

### Functional Checks
- ✅ User data consistency
- ✅ Token functionality
- ✅ Profile update persistence
- ✅ Admin role verification

## 🌐 Environment Switching

### Production (Default)
```
base_url: https://rewear-community-clothing-exchange-production.up.railway.app
```

### Local Development
To test against local development server:

1. Update environment variable:
   ```
   base_url: http://localhost:8000
   ```
2. Make sure your local server is running:
   ```bash
   python manage.py runserver
   ```

## 🔐 Authentication Flow

The tests follow a realistic authentication flow:

1. **Registration** → Gets access & refresh tokens
2. **Subsequent requests** → Use Bearer token authentication
3. **Token refresh** → Updates access token when needed
4. **Logout simulation** → Tests without authentication

## 📊 Expected Test Results

When all tests pass, you should see:

- ✅ **10/10 tests passing**
- ✅ All status codes correct
- ✅ All response structures valid
- ✅ Authentication working properly
- ✅ Profile management functional

## 🐛 Troubleshooting

### Common Issues

**❌ Connection Error**
- Check if the API is deployed and running
- Verify the `base_url` environment variable

**❌ 401 Unauthorized**
- Check if user registration succeeded
- Verify JWT tokens are being stored correctly

**❌ Test User Already Exists**
- Use a different email in the registration test
- Or delete the test user from Django admin

**❌ Token Expired**
- Re-run the login test to get fresh tokens
- Check JWT token expiry settings

### Debug Tips

1. **Check Console** - Postman console shows detailed logs
2. **Environment Variables** - Verify tokens are being set
3. **Response Body** - Check actual API responses
4. **Server Logs** - Check Railway deployment logs

## 🚀 Advanced Usage

### Custom Test Data

Modify the request bodies to test with different data:

```json
{
    "username": "your_test_user",
    "email": "your_email@example.com",
    "password": "your_test_password",
    "first_name": "Your",
    "last_name": "Name"
}
```

### Collection Runner

Use Postman's Collection Runner for:
- Automated testing
- Load testing
- CI/CD integration
- Test reports

### Newman CLI

Run tests from command line:

```bash
npm install -g newman
newman run ReWear_API_Tests.postman_collection.json -e ReWear_API_Environment.postman_environment.json
```

## 📈 Next Steps

These tests cover the current API endpoints. As you add more features (Items, Transactions, Ratings), you can extend this collection with additional tests for:

- Item CRUD operations
- Image upload
- Transaction management
- Rating system
- Search and filtering
- Admin panel operations
