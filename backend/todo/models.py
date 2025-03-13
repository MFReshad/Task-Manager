from django.db import models

# Create your models here.

class Todo(models.Model):

    creation_date = models.DateTimeField(auto_now_add=True)

    title = models.CharField(max_length=100)

    details = models.CharField(max_length=500)

    complete = models.BooleanField(default=False)

    
    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-creation_date']

