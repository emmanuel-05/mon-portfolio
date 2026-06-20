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

    technologies = TechnologieSerialiser(many=True, read_only=True)
    
    class Meta:
        model = Projet
        #fields = '__all__'
        fields = [
            'id',
            'titre',
            'description', 
            'image_url',
            'technologies',
            'lien_github',
            'lien_demo'
        ]