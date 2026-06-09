from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Projet
from .serializers import ProjetSerializer
# Create your views here.

@api_view(['GET'])
def liste_projets(request):
    projets = Projet.objects.all()

    serializer = ProjetSerializer(
        projets,
        many=True
    )

    return Response(serializer.data)