from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def generate_diagram(request):
    prompt = request.data.get('prompt')

    return Response({
        'status':'success',
        'prompt':prompt
    })