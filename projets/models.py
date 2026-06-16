from django.db import models

class Technologie(models.Model):
    nom = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nom
    
class Projet(models.Model):
    titre = models.CharField(max_length=100)
    description = models.TextField()  
    image_url = models.URLField(null=True, blank=True)
    technologies = models.ManyToManyField(Technologie, related_name="projets")
    lien_github = models.URLField(blank=True)
    lien_demo = models.URLField(blank=True)
    
    def __str__(self):
        return self.titre