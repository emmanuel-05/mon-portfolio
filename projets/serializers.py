from rest_framework import serializers
from .models import Projet, Technologie

class TechnologieSerializer(serializers.ModelSerializer):
    """
    Sérialiseur optimisé pour le modèle Technologie.
    """
    class Meta:
        model = Technologie
        fields = ['id', 'nom']

# Alias pour préserver la compatibilité
TechnologieSerialiser = TechnologieSerializer


class ProjetSerializer(serializers.ModelSerializer):
    """
    Sérialiseur optimisé pour le modèle Projet avec relation ManyToMany sérialisée.
    """
    technologies = TechnologieSerializer(many=True, read_only=True)

    class Meta:
        model = Projet
        fields = [
            'id',
            'titre',
            'description',
            'image_url',
            'technologies',
            'lien_github',
            'lien_demo',
        ]