from django.urls import path
from .views import liste_projets, list_techno

urlpatterns = [
    path('', liste_projets),
    path('list-techno', list_techno),
    path('list-techno/', list_techno),
]