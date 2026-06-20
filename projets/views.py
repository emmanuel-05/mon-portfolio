from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Projet, Technologie
from .serializers import ProjetSerializer, TechnologieSerialiser
# Create your views here.

""" @api_view(['GET'])
def liste_projets(request):
    projets = Projet.objects.all()

    serializer = ProjetSerializer(
        projets,
        many=True
    )

    return Response(serializer.data)

@api_view(['GET'])
def list_techno(request):
    techno = Technologie.objects.all()
    
    serializer = TechnologieSerialiser(
        techno,
        many=True
    )
    return Response(serializer.data) """
    
@api_view(['GET'])
def liste_projets(request):
    projets = Projet.objects.all().prefetch_related('technologies')

    serializer = ProjetSerializer(
        projets,
        many=True
    )
    return Response(serializer.data)

@api_view(['GET'])
def list_techno(request):
    techno = Technologie.objects.all().order_by('nom')
    
    serializer = TechnologieSerialiser(
        techno,
        many=True
    )
    return Response(serializer.data)
