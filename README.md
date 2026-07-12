# GitaVerse
![image](https://res.cloudinary.com/dwdsw96fy/image/upload/v1783854775/Screenshot_2026-07-12_163603_etdb14.png)
A full-stack web app for exploring the **Bhagavad Gita** — browse all 18 chapters and 700+ verses, receive a daily shloka, reveal a random verse, and get AI-powered guidance grounded in the Gita's teachings.

---

## Features

- **Browse the Gita** — All 18 chapters with verse-by-verse Sanskrit, transliteration, and meaning
- **Daily Shloka** — A fresh verse every day with translation and commentary, derived deterministically from the day of year
- **Random Verse** — Discover a verse chosen by chance
- **AI Chatbot** — Ask questions about life, dharma, karma, or any verse; get responses grounded in the Gita via RAG (Retrieval-Augmented Generation)
- **Semantic Search** — Embeddings stored in PostgreSQL with `pgvector`; the AI retrieves the most relevant verses before responding
- **Dark / Light Theme** — Animated theme toggle with GSAP-powered scroll transitions

---

## Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tool |
| Tailwind CSS v4 | Styling |
| React Router v7 | Client-side routing |
| GSAP + Motion | Scroll animations and transitions |
| Axios | HTTP client |
| Lottie + Swiper | Animations and carousels |

### Backend
| Tool | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| TypeScript | Type safety |
| Google Gemini (`gemini-2.5-flash`) | AI chatbot responses |
| Google Gemini (`gemini-embedding-001`) | Verse embeddings (768 dimensions) |
| PostgreSQL + `pgvector` | Vector similarity search |
| `pg` | PostgreSQL client |

---

## Project Structure

```
GitaVerse/
├── GitaVerse-backend/
│   ├── src/
│   │   ├── app.ts                  # Express entry point
│   │   ├── routes/routes.ts        # API routes
│   │   ├── controllers/            # Request handlers
│   │   ├── services/
│   │   │   ├── chatBotService.ts   # Gemini chat + RAG pipeline
│   │   │   ├── embeddingService.ts # pgvector similarity search
│   │   │   └── shlokaService.ts    # Daily shloka logic
│   │   ├── db/client.ts            # PostgreSQL pool
│   │   └── scripts/                # Embedding seed scripts
│   └── public/
│       ├── gita_english.json
│       └── gita_hindi.json
│
└── GitaVerse-frontend/
    └── src/
        ├── pages/
        │   ├── HeroSection.tsx
        │   ├── BrowseGita.tsx
        │   ├── ChapterDetail.tsx
        │   ├── VerseDetail.tsx
        │   ├── AIChatbot.tsx
        │   ├── RandomShloka.tsx
        │   ├── Contact.tsx
        │   └── Signup.tsx
        ├── components/             # Navbar, Footer, Cards, etc.
        ├── context/ThemeContext.tsx
        └── types/gita.ts
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/daily-shloka` | Returns today's shloka (text + meaning) |
| `POST` | `/api/v1/chatbot` | Accepts `{ question }`, returns AI response |

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL with `pgvector` extension enabled
- Google Gemini API key

### Backend Setup

```bash
cd GitaVerse-backend
npm install
```

Create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://user:password@host:5432/dbname
FRONTEND_URL=http://localhost:5173
```

Seed verse embeddings (run once):

```bash
npm run embed
```

Start the development server:

```bash
npm run dev
```

The backend runs on `http://localhost:3000`.

### Frontend Setup

```bash
cd GitaVerse-frontend
npm install
```

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`.

---

## How the AI Works

1. The user sends a question to `POST /api/v1/chatbot`
2. The question is embedded using `gemini-embedding-001` (768 dimensions)
3. The embedding is compared against pre-stored verse embeddings in PostgreSQL using cosine similarity (`pgvector`)
4. The top 5 most relevant verses are retrieved and injected into the system prompt
5. `gemini-2.5-flash` generates a response guided by those verses and a "GitaVerse AI guide" persona

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start backend in watch mode (nodemon) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Run compiled production build |
| `npm run embed` | Seed verse embeddings into PostgreSQL |

---

## License

ISC
