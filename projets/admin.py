from django.contrib import admin
from .models import Projet, Technologie

@admin.register(Technologie)
class TechnologieAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom')
    search_fields = ('nom',)
    ordering = ('nom',)


@admin.register(Projet)
class ProjetAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'titre',
        'description_courte',
        'image_url',
        'afficher_technologies',
        'lien_github',
        'lien_demo',
    )
    list_editable = ['image_url']
    search_fields = ('titre', 'description')
    filter_horizontal = ('technologies',)

    def get_queryset(self, request):
        # Évite les requêtes N+1 lors de l'affichage de la liste dans l'admin Django
        return super().get_queryset(request).prefetch_related('technologies')

    @admin.display(description='Technologies')
    def afficher_technologies(self, obj):
        return ", ".join([tech.nom for tech in obj.technologies.all()])

    @admin.display(description='Description')
    def description_courte(self, obj):
        if len(obj.description) > 60:
            return obj.description[:57] + '...'
        return obj.description