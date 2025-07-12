# ReWear Backend API

Django REST API for the ReWear clothing exchange platform (Odoo Hackathon project).

## Features

- Custom User authentication with JWT tokens
- Item listing and management system
- Transaction system for swaps/exchanges
- User rating system
- Points-based exchange system
- Comprehensive admin interface

## Models Overview

### User
- Custom user model extending Django's AbstractUser
- Additional fields: points_balance, bio, location, avatar, swap statistics
- Role-based permissions (user/admin)

### Item
- Clothing items with categories, sizes, conditions
- Multiple image support with primary image designation
- Status tracking (available, pending, swapped, etc.)
- Points-based valuation system

### Transaction
- Handles swaps, points exchanges, and donations
- Status tracking (pending, accepted, completed, cancelled, disputed)
- Links users and items with detailed transaction history

### Rating
- User rating system tied to transactions
- 1-5 star rating with optional comments
- Prevents duplicate ratings per transaction

## Prerequisites

- Python 3.8+
- PostgreSQL
- Virtual Environment

## Setup Instructions

### 1. Environment Setup

1. Create and activate virtual environment:
```bash
python -m venv .venv
.venv\Scripts\activate  # On Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

### 2. Database Setup

1. Install PostgreSQL and create a database:
```sql
CREATE DATABASE odoo_hackathon_db;
CREATE USER postgres WITH PASSWORD 'your_password_here';
GRANT ALL PRIVILEGES ON DATABASE odoo_hackathon_db TO postgres;
```

2. Update the `.env` file with your database credentials:
```
DB_NAME=odoo_hackathon_db
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432
```

### 3. Django Setup

1. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

2. Create superuser:
```bash
python manage.py createsuperuser
```

3. Collect static files:
```bash
python manage.py collectstatic
```

### 4. Run Development Server

```bash
python manage.py runserver
```

The API will be available at: `http://localhost:8000/`
Admin panel: `http://localhost:8000/admin/`

## Project Structure

```
backend/
├── config/                 # Main Django project settings
│   ├── __init__.py
│   ├── settings.py        # Django settings with PostgreSQL config
│   ├── urls.py           # Main URL configuration
│   ├── wsgi.py
│   └── asgi.py
├── apps/                  # Django applications
│   ├── __init__.py
│   └── urls.py           # Apps URL configuration
├── static/               # Static files
├── media/                # User uploaded files
├── templates/            # HTML templates
├── utils/                # Utility functions
├── requirements.txt      # Python dependencies
├── .env                 # Environment variables
├── .gitignore          # Git ignore file
└── manage.py           # Django management script
```

## Features Configured

- ✅ PostgreSQL database configuration
- ✅ Django REST Framework
- ✅ CORS headers for frontend integration
- ✅ Static and media files handling
- ✅ Environment variables management
- ✅ Admin interface
- ✅ Modular app structure

## Creating New Apps

To create a new Django app:

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login  
- `POST /api/auth/token/refresh/` - Refresh JWT token
- `GET /api/auth/profile/` - Current user profile
- `PUT /api/auth/profile/` - Update user profile
- `GET /api/auth/users/{id}/` - Public user profile

### Items (Coming Soon)
- Item CRUD operations
- Image upload and management
- Search and filtering

### Transactions (Coming Soon)
- Create and manage transactions
- Status updates and tracking

## Environment Variables

Current environment variables in `.env`:

- `SECRET_KEY`: Django secret key
- `DEBUG`: Debug mode (True/False)
- `DB_NAME`: PostgreSQL database name (rewear_db)
- `DB_USER`: PostgreSQL username
- `DB_PASSWORD`: PostgreSQL password
- `DB_HOST`: PostgreSQL host
- `DB_PORT`: PostgreSQL port
- `ALLOWED_HOSTS`: Comma-separated allowed hosts
- `CORS_ALLOWED_ORIGINS`: CORS allowed origins

## Database Models

The application includes complete models for:
- Users with platform-specific fields
- Items with images and categories
- Transactions for swaps and exchanges
- Ratings tied to transactions

## Admin Interface

Access the Django admin at `/admin/` with superuser credentials to manage all models.

## JWT Authentication

- Access tokens expire in 1 hour
- Refresh tokens expire in 7 days
- Include access token in Authorization header: `Bearer <token>`

## Current Status

✅ Models created and migrated
✅ Authentication API implemented
✅ Admin interface configured
✅ JWT token system working
🔄 Database setup needed
🔄 Item and Transaction APIs pending
