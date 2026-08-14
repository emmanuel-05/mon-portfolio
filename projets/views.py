from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.cache import cache_control
from .models import Projet, Technologie
from .serializers import ProjetSerializer, TechnologieSerializer

@api_view(['GET'])
@cache_control(max_age=300, public=True)
def liste_projets(request):
    """
    Retourne la liste des projets avec préchargement optimisé (anti-N+1) des technologies.
    Mise en cache HTTP de 5 minutes côté client/proxy.
    """
    projets = Projet.objects.prefetch_related('technologies').all()
    serializer = ProjetSerializer(projets, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@cache_control(max_age=300, public=True)
def list_techno(request):
    """
    Retourne la liste ordonnée des technologies.
    Mise en cache HTTP de 5 minutes côté client/proxy.
    """
    technologies = Technologie.objects.all().order_by('nom')
    serializer = TechnologieSerializer(technologies, many=True)
    return Response(serializer.data)
