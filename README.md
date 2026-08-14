# Portfolio Développeur Full Stack (Django + React + PostgreSQL)

Application web moderne et réactive pour présenter des réalisations et compétences professionnelles. 
L'architecture est pensée pour un **temps de chargement ultra-rapide (< 1s)**, 
une **légèreté maximale (< 400 Mo de RAM)** et une conformité **Production-Ready** (Docker Compose, Nginx, Gunicorn).

---

## 📑 Sommaire
- [Architecture & Fonctionnalités](#-architecture--fonctionnalités)
- [Stack Technique](#-stack-technique)
- [Guide de Démarrage Rapide](#-guide-de-démarrage-rapide)
  - [1. Prérequis](#1-prérequis)
  - [2. Clonage du Répertoire](#2-clonage-du-répertoire)
  - [3. Configuration & Lancement du Backend (Django)](#3-configuration--lancement-du-backend-django)
  - [4. Configuration & Lancement du Frontend (React)](#4-configuration--lancement-du-frontend-react)
- [Déploiement en Production (Docker Compose)](#-déploiement-en-production-docker-compose)
- [Endpoints API & Utilisation](#-endpoints-api--utilisation)
- [Commandes Utiles & Maintenance](#-commandes-utiles--maintenance)

---

## 🏛 Architecture & Fonctionnalités

```
                   +--------------------------------------------+
                   |           Client / Navigateur Web          |
                   +--------------------------------------------+
                                        │
                                     (Port 80)
                                        ▼
                   +--------------------------------------------+
                   |         Nginx (Reverse Proxy & SPA)        |
                   +--------------------------------------------+
                     │                        │               │
      (Routes React) │          (/api/ & /admin/) │               │ (/media/)
                     ▼                        ▼               ▼
      +----------------------+   +-----------------------+   +-------------------+
      | Frontend React (SPA) |   | Django REST (Gunicorn)|   | Volume Partagé    |
      |   Vite + Lucide      |   |   Python 3.12 Slim    |   | /app/media        |
      +----------------------+   +-----------------------+   +-------------------+
                                              │
                                              ▼
                                 +-----------------------+
                                 | PostgreSQL 16 Alpine  |
                                 | (Basse conso mémoire) |
                                 +-----------------------+
```

### ✨ Fonctionnalités Principales :
- **Catalogue de projets dynamique** : Filtrage, pagination et gestion des tags technologiques.
- **Interface d'administration Django** : Gestion CRUD complète des projets et compétences avec prévisualisation des images.
- **Requêtage optimisé anti N+1** : Préchargement des relations `ManyToMany` via `prefetch_related` et indexation B-Tree.
- **Frontend SPA réactif** : Code Splitting (`React.lazy`), mise en cache des assets, lazy-loading des médias et interface responsive.
- **Reverse Proxy unifié** : Nginx route de manière transparente les requêtes SPA, API, Admin et Médias uploadés.

---

## 🛠 Stack Technique

| Couche | Technologie | Rôle & Optimisations |
| :--- | :--- | :--- |
| **Backend** | **Django 6.x & DRF** | API REST, ORM, gestion admin, sécurité CSRF/CORS |
| **Serveur WSGI** | **Gunicorn (gthread)** | 2 workers multi-threadés pour une empreinte RAM minimale (~80 Mo) |
| **Frontend** | **React 19 & Vite 8** | SPA modulaire, Code Splitting (`lazy`/`Suspense`), Bundles compressés Gzip |
| **Base de Données** | **PostgreSQL 16 Alpine** | SGBD relationnel optimisé (`shared_buffers=64MB`, RAM < 50 Mo) |
| **Reverse Proxy** | **Nginx Alpine** | Distribution statique, proxying API/Admin, compression Gzip temps réel |
| **Conteneurs** | **Docker & Docker Compose**| Déploiement multi-services reproductible en 1 commande |

---

## 🏁 Guide de Démarrage Rapide

### 1. Prérequis
Assurez-vous d'avoir installé sur votre machine :
- **Python** (version 3.11 ou supérieure)
- **Node.js** (version 20 LTS ou supérieure) et `npm`
- **PostgreSQL** (version 16 ou supérieure) ou SQLite (inclus par défaut pour dev)
- **Git**
- **Docker & Docker Compose** (Optionnel pour exécution conteneurisée)
- **Visual Studio Code** (ou votre éditeur favori)

---

### 2. Clonage du Répertoire

```bash
# Cloner le dépôt GitHub
git clone https://github.com/emmanuel-05/mon-portfolio.git

# Accéder au dossier du projet
cd mon-portfolio

# Ouvrir dans VS Code
code .
```

---

### 3. Configuration & Lancement du Backend (Django)

#### A. Création et activation de l'environnement virtuel

**Sur Windows (PowerShell) :**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Sur Linux / macOS :**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### B. Installation des dépendances
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

#### C. Configuration du fichier `.env`
Copiez le modèle d'environnement :
```bash
cp .env.example .env
```

Pour un développement local immédiat avec **SQLite**, votre fichier `.env` peut simplement contenir :
```env
DEBUG=True
DJANGO_SECRET_KEY=votre-cle-secrete-locale-tres-longue
ALLOWED_HOSTS=localhost,127.0.0.1
CSRF_TRUSTED_ORIGINS=http://localhost:5173 http://127.0.0.1:5173
```

*(Si vous utilisez PostgreSQL en local, décommentez et ajustez `DATABASE_URL=postgres://user:password@localhost:5432/portfolio_db`)*.

#### D. Application des migrations & Création du superutilisateur
```bash
# Exécuter les migrations
python manage.py migrate

# Créer automatiquement le superutilisateur
python create_superuser.py
```
*(Identifiants par défaut créés : Identifiant = `admin` / Mot de passe = `admin1234`)*

#### E. Lancement du serveur Django
```bash
python manage.py runserver
```
Le backend est accessible sur : `http://127.0.0.1:8000/`

---

### 4. Configuration & Lancement du Frontend (React)

Ouvrez un second terminal :

```bash
# Se déplacer dans le dossier frontend
cd frontend

# Installer les dépendances Node
npm install

# Lancer le serveur de développement Vite
npm run dev
```

L'application React est accessible sur : `http://localhost:5173/`

> **Note :** En mode développement, le fichier `vite.config.js` est configuré avec un proxy automatique redirigeant `/api`, `/media` et `/admin` vers `http://127.0.0.1:8000`.

---

## 🚢 Déploiement en Production (Docker Compose)

Le projet est configuré pour un déploiement clé en main sur tout VPS (ex: Contabo, OVH, DigitalOcean) en une commande unique.

### 1. Préparer l'environnement de production sur le serveur
```bash
cp .env.example .env
nano .env
```
Renseignez vos identifiants sécurisés :
```env
DEBUG=False
DJANGO_SECRET_KEY=cle_secrete_ultra_securisee_de_production
ALLOWED_HOSTS=localhost,127.0.0.1,VOTRE_IP_VPS,votre-domaine.com
CSRF_TRUSTED_ORIGINS=http://VOTRE_IP_VPS https://votre-domaine.com

POSTGRES_DB=portfolio_db
POSTGRES_USER=portfolio_user
POSTGRES_PASSWORD=mot_de_passe_robuste_postgres
```

### 2. Démarrer l'ensemble des conteneurs
```bash
docker compose up -d --build
```

Cette commande exécute automatiquement :
1. L'initialisation de la base PostgreSQL 16 Alpine isolée avec limites de mémoire.
2. Le build multi-stage du backend avec application des migrations et collecte des fichiers statiques.
3. Le build de production du frontend React injecté dans un serveur Nginx haute performance.

### 3. Vérifier l'état et les ressources
```bash
# Vérifier l'état des conteneurs
docker compose ps

# Suivre les logs en direct
docker compose logs -f

# Contrôler l'empreinte mémoire en temps réel (< 400 Mo)
docker stats
```

---

## 📡 Endpoints API & Utilisation

| Méthode | Route | Description | Accès |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/projets/` | Liste tous les projets avec leurs technologies associées | Public (Cache 5 min) |
| `GET` | `/api/projets/list-techno` | Liste toutes les compétences / technologies | Public (Cache 5 min) |
| `GET` / `POST` | `/admin/` | Interface d'administration Django | Administrateur |
| `GET` | `/media/<path>` | Fichiers médias et captures d'écran uploadées | Public |
| `GET` | `/static/<path>` | Fichiers statiques (WhiteNoise / Nginx) | Public |

---

## 🧪 Commandes Utiles & Maintenance

```bash
# Vérifier la cohérence de l'architecture Django
python manage.py check

# Créer une nouvelle migration après modification des modèles
python manage.py makemigrations

# Compiler le frontend manuellement pour valider le bundle de production
cd frontend && npm run build

# Arrêter les services Docker sans supprimer les données
docker compose down

# Arrêter les services Docker en réinitialisant les volumes (Attention: supprime les données)
docker compose down -v
```