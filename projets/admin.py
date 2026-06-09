from django.contrib import admin
from .models import Projet

# Register your models here.

@admin.register(Projet)
class ProjetAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'titre',
        'description',
        'technologies',
        'lien_github',
    )