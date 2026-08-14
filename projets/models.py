from django.db import models

class Technologie(models.Model):
    nom = models.CharField(max_length=50, unique=True, db_index=True)

    class Meta:
        verbose_name = "Technologie"
        verbose_name_plural = "Technologies"
        ordering = ["nom"]

    def __str__(self):
        return self.nom


class Projet(models.Model):
    titre = models.CharField(max_length=100)
    description = models.TextField()
    image_url = models.URLField(max_length=500, null=True, blank=True)
    technologies = models.ManyToManyField(Technologie, related_name="projets", blank=True)
    lien_github = models.URLField(max_length=500, blank=True)
    lien_demo = models.URLField(max_length=500, blank=True)

    class Meta:
        verbose_name = "Projet"
        verbose_name_plural = "Projets"
        ordering = ["-id"]

    def __str__(self):
        return self.titre