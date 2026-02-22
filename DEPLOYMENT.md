# Deployment Guide (Railway + Vercel)

This repo is a monorepo:
- Backend: `backend/` (FastAPI)
- Frontend: `frontend/` (Vite + React)

## 1) Deploy Backend on Railway

1. In Railway, create a new project from this GitHub repo.
2. Create a service for the backend and set:
- Root Directory: `backend`
- Start command is already in `backend/railway.json`.

3. Add backend environment variables in Railway:
- `GROQ_API_KEY=...`
- `AI_MODEL=llama-3.3-70b-versatile` (optional)
- `VISION_MODEL=meta-llama/llama-4-scout-17b-16e-instruct` (optional)
- `VISION_FALLBACK_MODEL=meta-llama/llama-4-maverick-17b-128e-instruct` (optional)
- `CORS_ORIGINS=https://<your-vercel-domain>`

For preview + production domains, use comma-separated values:
`CORS_ORIGINS=https://your-app.vercel.app,https://your-custom-domain.com`

4. Deploy and copy the Railway public URL (example):
`https://your-backend.up.railway.app`

## 2) Deploy Frontend on Vercel

1. In Vercel, import this same repo.
2. Set:
- Root Directory: `frontend`
- Framework Preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

3. Add frontend environment variable:
- `VITE_API_BASE_URL=https://your-backend.up.railway.app`

4. Deploy.

## 3) Validate end-to-end

- Open frontend URL (Vercel).
- Start a new analysis and paste API key in the browser panel.
- Confirm analysis requests succeed and no CORS errors occur.

## Notes

- `frontend/vercel.json` includes SPA rewrites to `index.html`.
- Backend runs with `uvicorn main:app --host 0.0.0.0 --port $PORT` via `backend/railway.json`.
- Keep secrets only in Railway/Vercel env vars, never in git.
