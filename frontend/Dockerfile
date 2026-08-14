# Étape 1 : Build de l'application React
FROM node:20-alpine AS builder

WORKDIR /app

# Installation des dépendances (mise en cache des layers Docker)
COPY package*.json ./
RUN npm ci || npm install

# Copie des sources et compilation
COPY . .
RUN npm run build

# Étape 2 : Image runtime Nginx légère
FROM nginx:alpine

# Copie des artefacts compilés depuis l'étape de build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copie de la configuration Nginx optimisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposition du port HTTP
EXPOSE 80

# Lancement de Nginx en premier plan
CMD ["nginx", "-g", "daemon off;"]
