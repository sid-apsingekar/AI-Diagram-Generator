# AI Diagram Generator

AI Diagram Generator is a full-stack web application that converts natural language architecture descriptions into Mermaid diagrams. The frontend is built with Next.js and TypeScript, while the backend uses Django and Django REST Framework to call Google Gemini and generate Mermaid syntax securely.

## 🚀 Features

- Natural language prompt input for architecture diagrams
- Backend AI orchestration via Google Gemini
- Mermaid diagram rendering in-browser
- SVG download support
- Cross-origin API access configured for local frontend/backend development

## 🧩 Architecture

### Frontend
- Framework: Next.js 16.2.9
- Language: TypeScript
- UI library: Tailwind CSS
- Diagram rendering: Mermaid
- HTTP client: Axios

The frontend provides a prompt editor, a generate button, and a live diagram preview. When the user submits a prompt, it sends a POST request to the Django backend and renders the returned Mermaid markup.

### Backend
- Framework: Django 6.0.6
- API layer: Django REST Framework
- CORS handling: django-cors-headers
- AI service: Google Gemini via `google.generativeai`
- Optional diagram URL generator: Kroki service for PNG conversion

The backend exposes a single API endpoint at `/generate-diagram/` that accepts a `prompt` and returns Mermaid syntax. It uses a dedicated Gemini service with a strict system prompt so the model returns only Mermaid code.

## 📁 Project Structure

- `frontend/`
  - `app/page.tsx` — main interface and diagram generation flow
  - `app/components/MermaidDiagram.tsx` — Mermaid rendering component
  - `lib/api.ts` — Axios API client
  - `package.json` — frontend dependencies and scripts

- `backend/`
  - `config/` — Django project configuration and URL routing
  - `ai_diagram/` — Django app containing API views and AI service logic
  - `ai_diagram/services/gemini_service.py` — Gemini prompt wrapper
  - `ai_diagram/services/kroki_service.py` — optional Mermaid-to-PNG URL helper
  - `manage.py` — Django management entrypoint

## ⚙️ Setup

### Backend

1. Create a Python virtual environment and activate it.
2. Install the required dependencies.
3. Create a `.env` file in `backend/` with your Gemini API key.

Example `.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run Django migrations:

```bash
cd backend
python manage.py migrate
```

5. Start the backend server:

```bash
python manage.py runserver
```

### Frontend

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the Next.js app:

```bash
npm run dev
```

3. Open the app in your browser at `http://localhost:3000`.

## 🧪 Usage

1. Enter a textual description of your architecture or workflow.
2. Click `Generate Diagram`.
3. View the rendered Mermaid diagram instantly.
4. Download the diagram as an SVG using the provided button.

## 🛠️ Backend API

- `POST /generate-diagram/`
  - Request body: `{ "prompt": "Describe your system here" }`
  - Response body: `{ "prompt": string, "mermaid": string }`

## 🔐 Notes

- `CORS_ALLOW_ALL_ORIGINS = True` is enabled for local development only.
- The Gemini service expects a valid `GEMINI_API_KEY`.
- Mermaid rendering occurs in the browser; invalid Mermaid syntax may fail to render.

## 🤝 Contributing

- Improve prompt handling for more complex diagram types
- Add input validation and error handling on both frontend and backend
- Add authentication for production deployments
- Add persistent prompt history or diagram export options

## 📌 Recommended Enhancements

- Use environment-specific API base URLs for frontend/backend
- Add tests for the API and Mermaid rendering
- Add a production-ready deployment path for Django and Next.js

## License

This repository does not include a license file. Add one to make reuse explicit.
