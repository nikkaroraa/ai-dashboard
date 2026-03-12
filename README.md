# AI Intelligence Dashboard

Real-time AI/ML news intelligence dashboard built with Next.js 15, TypeScript, Tailwind, shadcn/ui, and Lucide icons.

## Features

- Unified multi-source AI feed (blogs, news, Reddit, HN, GitHub, research)
- Pre-configured AI-focused RSS sources
- Keyword highlighting + keyword management (localStorage)
- Source management (toggle/remove/add)
- Filters: source type, time range, search
- Auto-refresh every 5 minutes
- CORS RSS proxy API route: `/api/fetch-feed?url=...`
- Trending topics bar (last 24h)
- Quick stats: total items, items last hour, most active source
- Mobile sidebar via Sheet

## Run locally

```bash
pnpm install
pnpm dev
```

## Deploy

Push to GitHub and import in Vercel (zero-config for Next.js).
