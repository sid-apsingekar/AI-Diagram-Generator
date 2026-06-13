import requests
import base64
import zlib

def generate_diagram_url(mermaid_code):
    compressed = zlib.compress(mermaid_code.encode('utf-8'))

    encoded = base64.urlsafe_b64decode(
        compressed
    ).decode('utf-8')
    return f"https://kroki.io/mermaid/png/{encoded}"