# AI Diagram Generator

AI Diagram Generator converts natural language architecture descriptions into professional diagrams using Mermaid. It pairs a lightweight Next.js frontend with a Django API backend that orchestrates Google Gemini to produce Mermaid markup.

## Quick highlights

- Natural-language to Mermaid conversion using Google Gemini
- Client-side rendering with Mermaid for instant previews
- SVG export for diagrams
- Simple API: POST a `prompt`, receive Mermaid syntax

## Tech stack

- Frontend: Next.js (React, TypeScript), Tailwind CSS, Mermaid
- Backend: Django, Django REST Framework, django-cors-headers
- AI: Google Gemini (`google.generativeai` package)
- Optional: Kroki service helper for generating PNGs from Mermaid

## Architecture overview

1. User types a description in the Next.js UI and clicks "Generate".
2. Frontend sends `POST /generate-diagram/` to the Django backend.
3. Backend calls Google Gemini with a strict system prompt and returns Mermaid code.
4. Frontend renders the Mermaid markup client-side and allows downloading as SVG.

## Project layout

- frontend/
  - app/page.tsx — UI and prompt flow
  - app/components/MermaidDiagram.tsx — client-side Mermaid renderer
  - lib/api.ts — Axios client (baseURL: http://127.0.0.1:8000)
  - package.json — scripts: `dev`, `build`, `start`, `lint`

- backend/
  - config/ — Django project settings and routing
  - ai_diagram/ — app with views and AI services
  - ai_diagram/services/gemini_service.py — Gemini wrapper and prompt template
  - ai_diagram/services/kroki_service.py — optional Kroki URL generator
  - manage.py — Django CLI entrypoint

## Environment & configuration

Backend expects an environment variable for Gemini. Create `backend/.env` with:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Notes:
- `ai_diagram/services/gemini_service.py` loads `.env` via `python-dotenv` and uses `GEMINI_API_KEY`.
- For local dev, `CORS_ALLOW_ALL_ORIGINS = True` is set in `config/settings.py`; restrict this in production.
- Consider setting an environment variable for the frontend API base URL (e.g. `NEXT_PUBLIC_API_URL`) and updating `frontend/lib/api.ts` to reference it instead of a hardcoded URL.

## Setup & run (local)

Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
# or `source venv/bin/activate` on macOS/Linux
pip install -r requirements.txt  # or manually install deps in your venv
python manage.py migrate
python manage.py runserver
```

Frontend

```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000
```

If you don't have a `requirements.txt`, install the essentials used in the project:

```bash
pip install django djangorestframework django-cors-headers python-dotenv google-generativeai
```

## API reference

POST /generate-diagram/

- Request JSON

```json
{
  "prompt": "Short description of the system or flow to diagram"
}
```

- Successful response (200)

```json
{
  "prompt": "...",
  "mermaid": "flowchart TD\\n  A-->B"
}
```

- Error response example

```json
{
  "error": "<message>"
}
```

The backend currently returns a 429 status in some exception handlers for rate or quota conditions. You can update `backend/ai_diagram/views.py` to map errors to more specific status codes as needed.

## Usage notes & best practices

- The `gemini_service` enforces a system prompt asking the model to return only Mermaid code. Still validate or sanitize the returned text before rendering in production.
- Do not commit your API keys; keep them in environment variables or a secrets manager.
- For production, replace `CORS_ALLOW_ALL_ORIGINS` with a safe `CORS_ALLOWED_ORIGINS` list.
- Consider adding request rate limiting and authentication to protect API usage and avoid Gemini quota overages.

## Deployment guidance

- Frontend: Deploy to Vercel, Netlify, or any static host that supports Next.js. Use environment variables (e.g. `NEXT_PUBLIC_API_URL`) to point to your backend.
- Backend: Deploy Django to any WSGI/ASGI host (e.g., Gunicorn + Nginx, or a PaaS like Heroku/Render/GCP App Engine). Keep `GEMINI_API_KEY` in the host's secret store.
- If using the Kroki helper for PNG generation, ensure the external requests to `https://kroki.io` are permitted by your hosting environment's outbound rules.

## Tests & QA

- Add unit tests for `ai_diagram/services/gemini_service.py` by mocking the Gemini client.
- Add end-to-end tests that hit the `/generate-diagram/` API using a test client and verify valid Mermaid output.

## Contributing

- Fork the repo and open pull requests with focused changes.
- Add tests for new behavior and update this README when you change the API contract.

## Next improvements (ideas)

- Replace hardcoded frontend API URL with `NEXT_PUBLIC_API_URL`.
- Add request throttling and quota handling in the backend.
- Provide diagram type selection (flowchart, sequence, class, state) with model instruction tuning.
- Persist generated diagrams and provide a history UI.


