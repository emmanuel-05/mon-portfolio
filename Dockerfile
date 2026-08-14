# Multi-stage ou image slim optimisée pour une empreinte mémoire minimale
FROM python:3.12-slim

# Empêche la génération de fichiers .pyc et assure des logs non-tamponnés en temps réel
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Dépendances système minimales (curl pour les healthchecks)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Installation des dépendances Python
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copie du code source backend
COPY . .

# Permissions d'exécution sur le script de démarrage
RUN chmod +x /app/entrypoint.sh

# Exposition du port Gunicorn
EXPOSE 8000

# Point d'entrée de démarrage automatique
ENTRYPOINT ["/app/entrypoint.sh"]
