from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services.gemini_service import generate_mermaid
from .services.kroki_service import generate_diagram_url


@api_view(['POST'])
def generate_diagram(request):
    prompt = request.data.get('prompt')
    mermaid_code = generate_mermaid(prompt)
    # diagram_url=generate_diagram_url(mermaid_code)
    return Response({
        'prompt':prompt,
        'mermaid':mermaid_code,
        # 'diagram_url':diagram_url
    })