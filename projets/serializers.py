from rest_framework import serializers
from .models import Projet, Technologie

class TechnologieSerialiser(serializers.ModelSerializer):
    """
    Sérialiseur pour le modèle Technologie.
    Convertit les instances du modèle Technologie en données JSON prêtes pour l'API.
    """
    class Meta:
        model = Technologie
        fields = ['id', 'nom'] 

class ProjetSerializer(serializers.ModelSerializer):

    # Override du champ de relation Many-to-Many 'technologies'.
    # Au lieu de renvoyer une simple liste d'identifiants numériques (ex: [1, 2]),
    # on utilise le sérialiseur TechnologieSerialiser pour inclure les objets complets :
    # many=True : spécifie que le projet peut avoir plusieurs technologies associées.
    technologies = TechnologieSerialiser(many=True, read_only=True)
    
    class Meta:
        model = Projet
        fields = '__all__'