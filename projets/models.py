from django.db import models

# Create your models here.
class Projet(models.Model):
    titre = models.CharField(max_length=100)
    description = models.TextField()
    technologies = models.CharField(max_length=200) # Ex: "React, Django, PostgreSQL"
    lien_github = models.URLField(blank=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def __str__(self):
        return self.titre