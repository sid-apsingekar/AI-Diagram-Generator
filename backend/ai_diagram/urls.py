from django.urls import path
from .views import generate_diagram

urlpatterns = [
    path('generate-diagram/',generate_diagram),
]