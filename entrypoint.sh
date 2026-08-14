#!/bin/sh
set -e

echo "==> Application des migrations de la base de données..."
python manage.py migrate --noinput

echo "==> Collecte des fichiers statiques dans STATIC_ROOT..."
python manage.py collectstatic --noinput --clear

echo "==> Ajustement des permissions des fichiers statiques et médias pour Nginx..."
chmod -R 755 /app/staticfiles /app/media 2>/dev/null || true

if [ -f "create_superuser.py" ]; then
    echo "==> Vérification / Création automatique du superutilisateur..."
    python create_superuser.py || true
fi

echo "==> Démarrage du serveur Gunicorn (mode gthread économe en RAM)..."
exec gunicorn backend.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 2 \
    --threads 2 \
    --worker-class gthread \
    --max-requests 1000 \
    --max-requests-jitter 50 \
    --timeout 60 \
    --access-logfile - \
    --error-logfile -
