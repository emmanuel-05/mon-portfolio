from rest_framework import serializers
from .models import Projet, Technologie

class TechnologieSerialiser(serializers.ModelSerializer):
    """
    Sérialiseur pour le modèle Technologie.
    Convertit les instances du modèle Technologie en données JSON prêtes pour l'API.
    """
    class Meta:
        model = Technologie
        # Seuls les champs 'id' et 'nom' seront retournés dans le JSON
        fields = ['id', 'nom'] 

class ProjetSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour le modèle Projet.
    Convertit les instances du modèle Projet en données JSON prêtes pour l'API.
    """
    # Override du champ de relation Many-to-Many 'technologies'.
    # Au lieu de renvoyer une simple liste d'identifiants numériques (ex: [1, 2]),
    # on utilise le sérialiseur TechnologieSerialiser pour inclure les objets complets :
    # many=True : spécifie que le projet peut avoir plusieurs technologies associées.
    # read_only=True : indique que ce champ est en lecture seule lors des requêtes API.
    technologies = TechnologieSerialiser(many=True, read_only=True)
    
    class Meta:
        model = Projet
        # '__all__' indique que tous les champs du modèle (titre, description, etc.) seront inclus
        fields = '__all__'