from django.urls import path
from .views import liste_projets

urlpatterns = [
    path('', liste_projets),
]