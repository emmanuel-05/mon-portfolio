import os
import dj_database_url
from pathlib import Path
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Chargement des variables d'environnement depuis le fichier .env
load_dotenv(os.path.join(BASE_DIR, '.env'))

# Configuration des fichiers statiques (WhiteNoise)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Configuration Django pour le stockage des fichiers statiques
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
    },
}

# Configuration pour les fichiers uploadés (images des projets)
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Clé secrète Django
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', os.environ.get('SECRET_KEY', 'une-cle-de-secours-locale'))

# Mode DEBUG piloté par l'environnement (défaut False en production)
DEBUG = os.environ.get('DEBUG', 'False').lower() in ('true', '1', 't')

# Hôtes autorisés
ALLOWED_HOSTS = [host.strip() for host in os.environ.get('ALLOWED_HOSTS', '*').split(',') if host.strip()]

# Origines de confiance pour la protection CSRF (Admin & requêtes POST en production)
raw_csrf = os.environ.get('CSRF_TRUSTED_ORIGINS', 'http://localhost http://127.0.0.1')
CSRF_TRUSTED_ORIGINS = [origin.strip() for origin in raw_csrf.replace(',', ' ').split(' ') if origin.strip()]

# CONFIGURATION PROXY & SÉCURITÉ HTTPS (PRODUCTION)
USE_X_FORWARDED_HOST = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
CSRF_COOKIE_SECURE = os.environ.get('CSRF_COOKIE_SECURE', str(not DEBUG)).lower() in ('true', '1', 't')
SESSION_COOKIE_SECURE = os.environ.get('SESSION_COOKIE_SECURE', str(not DEBUG)).lower() in ('true', '1', 't')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Applications tierces & locales
    'rest_framework',
    'corsheaders',
    'projets',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',       # Gère les requêtes Cross-Origin
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Sert les fichiers statiques de manière ultra-rapide
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Configuration CORS
CORS_ALLOW_ALL_ORIGINS = os.environ.get('CORS_ALLOW_ALL_ORIGINS', str(DEBUG)).lower() in ('true', '1', 't')
raw_cors = os.environ.get('CORS_ALLOWED_ORIGINS', 'http://localhost http://127.0.0.1 http://localhost:5173 https://portfolio-gnamien.faslab.online')
CORS_ALLOWED_ORIGINS = [origin.strip() for origin in raw_cors.replace(',', ' ').split(' ') if origin.strip()]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# Database configuration via DATABASE_URL (avec fallback SQLite si non défini)
DATABASES = {
   'default': dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}", 
        conn_max_age=600,
        conn_health_checks=True
    )
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
