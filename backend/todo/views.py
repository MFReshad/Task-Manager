from django.http import HttpResponse
from django.shortcuts import render

from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo


def home(request):
    return HttpResponse("Hello World!")

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()


