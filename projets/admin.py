from django.contrib import admin
from .models import Projet, Technologie

# Register your models here.
@admin.register(Technologie)
class TechnologieAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom')

@admin.register(Projet)
class ProjetAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'titre',
        'description',
        'image_url',
        'afficher_technologies',
        'lien_github',
        'lien_demo',
    )
    list_editable = ['image_url']

    def afficher_technologies(self, obj):
        # On récupère toutes les technologies du projet et on extrait leur nom
        return ", ".join([tech.nom for tech in obj.technologies.all()])