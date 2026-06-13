import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)
model = genai.GenerativeModel("gemini-2.5-flash")

def generate_mermaid(prompt):
    system_prompt = f"""
    You are a Mermaid diagram generator.

    Generate ONLY Mermaid syntax.

    Rules:
    - Return only Mermaid code.
    - Do not explain anything.
    - Do not use markdown.
    - Do not use ```mermaid.
    - Use flowchart TD unless another Mermaid diagram type is clearly better.

    User Request:
    {prompt}
    """
    response = model.generate_content(system_prompt)
    result =  response.text.strip()
    result = result.replace("```mermaid", "")
    result = result.replace("```", "")

    return result.strip()
