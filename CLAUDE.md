# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:8080
npm run build      # Production build
npm run build:dev  # Dev-mode build
npm run lint       # ESLint
```

No test suite is configured.

## What This App Is

Al-Qaws is an Islamic traditional archery training app. It combines:
- AI-powered technique analysis (upload a photo/video, get feedback grounded in classical manuscripts)
- Training session logging with XP/rank progression
- A classical manuscript library (Arab Archery, Saracen Archery, Mamluk Furusiyah) stored as static TypeScript data
- Heritage stories and daily affirmations drawn from Islamic tradition
- Progress tracking, equipment notes, and community pages

## Architecture

### Routing & Layout
All routes share `AppLayout` (`src/components/layout/AppLayout.tsx`), which renders `TopHeader`, `BottomNav` (mobile), and a persistent affirmations side-tab. The bottom nav shows 5 items; the full menu lives in a hamburger drawer. Route definitions are in `src/App.tsx`. Navigation items are centrally defined in `src/config/navigation.ts`.

### Auth
`AuthContext` (`src/contexts/AuthContext.tsx`) wraps the entire app and exposes `useAuth()`. It manages Supabase session state. Email/password and OAuth (Google, Apple, Microsoft) are supported — OAuth goes through `src/integrations/lovable/index.ts` (auto-generated, do not edit). Pages gate auth-required content by checking `useAuth().user`.

### Data Layer
Two persistence layers coexist:

**Supabase (authenticated users):** `training_sessions`, `profiles`, `reading_progress`, `analysis_history` tables. All queries go through custom hooks in `src/hooks/`. The client is `src/integrations/supabase/client.ts` (auto-generated — import it, don't modify it). TypeScript types live in `src/integrations/supabase/types.ts` (also auto-generated).

**localStorage (anonymous):** Analysis history cache (`useAnalysisHistory`), app settings (`useSettings`), saved stories, technique favorites. These hooks live in `src/hooks/` alongside the Supabase hooks but never call Supabase.

### Static Content
Manuscripts, technique library, affirmations, and quick actions are **TypeScript files in `src/config/`**, not database records. New content is added there, not via migrations.

### Edge Functions
`supabase/functions/analyze-technique/` — receives a base64 image + optional frame label, calls an AI model with a prompt grounded in classical archery texts, returns a JSON score/feedback object. Requires auth header. `supabase/functions/generate-story/` works similarly for heritage story generation.

### Design System
Dark futuristic theme with neon accents. CSS custom properties are defined in `src/index.css`.
- **Primary:** orange/coral (`--primary`)
- **Accent:** cyan neon (`--accent` / `--neon-cyan`)
- **Fonts:** `font-display` → Playfair Display (headings), `font-body` → Inter (body)
- **`CornerFrame`** (`src/components/ui/corner-frame.tsx`) is the project's styled card container — use it instead of plain `Card` for primary content blocks
- Use `cn()` from `src/lib/utils.ts` for conditional class merging

### Path Alias
`@/` resolves to `src/`. Use it for all internal imports.

### Component Organization
Feature components live under `src/components/<feature>/` (e.g., `sessions/`, `analyze/`, `home/`, `reading/`). shadcn/ui primitives are in `src/components/ui/`.
