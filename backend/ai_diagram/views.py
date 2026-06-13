from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services.gemini_service import generate_mermaid

@api_view(['POST'])
def generate_diagram(request):
    prompt = request.data.get('prompt')
    mermaid_code = generate_mermaid(prompt)
    return Response({
        'prompt':prompt,
        'mermaid':mermaid_code
    })