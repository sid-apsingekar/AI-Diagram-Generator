import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)
model = genai.GenerativeModel("gemini-2.5-flash")

def generate_mermaid(prompt):
    system_prompt =f"""
        Generate ONLY valid Mermaid flowchart code.

        Rules:
        - Return ONLY Mermaid code.
        - Do NOT use markdown fences.
        - Use flowchart TD.
        - Avoid parentheses (), quotes, colons, and special characters in node labels.
        - Use simple labels only.
        - Output must be valid Mermaid syntax.

        User Request:
        {prompt}
            """
    response = model.generate_content(system_prompt)
    result =  response.text.strip()
    result = result.replace("```mermaid", "")
    result = result.replace('(',"")
    result = result.replace(')',"")
    result = result.replace('"',"")
    result = result.replace("'","")
    result = result.replace("```", "")

    return result.strip()
