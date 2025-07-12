# Django Backend - Odoo Hackathon

This is the Django backend for the Odoo Hackathon project with PostgreSQL database.

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

```bash
cd apps
python ../manage.py startapp your_app_name
```

Then add the app to `INSTALLED_APPS` in `config/settings.py` and include its URLs in `apps/urls.py`.

## Environment Variables

Key environment variables in `.env`:

- `SECRET_KEY`: Django secret key
- `DEBUG`: Debug mode (True/False)
- `DB_NAME`: PostgreSQL database name
- `DB_USER`: PostgreSQL username
- `DB_PASSWORD`: PostgreSQL password
- `DB_HOST`: PostgreSQL host
- `DB_PORT`: PostgreSQL port
- `ALLOWED_HOSTS`: Comma-separated allowed hosts
- `CORS_ALLOWED_ORIGINS`: Comma-separated CORS allowed origins

## API Documentation

Once you create apps and views, the API endpoints will be available under `/api/`.

## Next Steps

1. Create your Django apps in the `apps/` directory
2. Define your models, views, and serializers
3. Add URL patterns for your apps
4. Test your API endpoints
