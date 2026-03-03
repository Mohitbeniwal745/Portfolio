# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A minimal, pixel-perfect dev portfolio, component registry, and blog built with Next.js 16 (App Router), Tailwind CSS v4, and shadcn/ui. Uses pnpm as the package manager.

## Commands

```bash
pnpm dev              # Dev server on port 1408
pnpm build            # Production build
pnpm preview          # Build + start on port 1408
pnpm lint             # ESLint
pnpm lint:fix         # ESLint with auto-fix
pnpm check-types      # TypeScript type checking (tsc --noEmit)
pnpm format:check     # Prettier check
pnpm format:write     # Prettier write
pnpm registry:build   # Build component registry (internal build + shadcn build)
```

## Architecture

### Route Structure (App Router with Route Groups)

- `src/app/layout.tsx` - Root layout
- `src/app/(app)/layout.tsx` - Main app layout (nav, footer)
- `src/app/(app)/(docs)/layout.tsx` - Docs/content layout (blog, components, sponsors, testimonials)
- `src/app/(llms)/` - AI-readable endpoints (`/llms.txt`, `/about.md`, `/experience.md`, etc.)
- `src/app/og/` - Dynamic OG image generation routes
- `src/app/vcard/` - vCard download endpoint

Blog and component pages share the same `(docs)` layout and use dynamic `[slug]` routes.

### Key Directories

- `src/components/` - Shared UI components used across the site
- `src/components/ui/` - shadcn/ui primitives (button, dialog, input, etc.)
- `src/features/` - Feature modules (blog, portfolio, sponsors) with their own data, components, and content
- `src/registry/` - Component registry source (components, hooks, blocks, examples, lib)
- `src/__registry__/` - **Auto-generated. DO NOT EDIT.** Built by `pnpm registry:build`
- `src/config/` - Site config (`site.ts`) and registry config (`registry.ts`)
- `src/lib/` - Utilities, helpers, analytics events (`events.ts`)

### Component Registry System

The project hosts a shadcn-compatible component registry. Registry items live in `src/registry/` organized by type:
- `components/` with `_registry.ts`
- `hooks/` with `_registry.ts`
- `blocks/` with `registry-blocks.ts`
- `examples/` with `_registry.ts`
- `lib/` with `_registry.ts`

After adding/modifying registry items, run `pnpm registry:build`. This generates files in `src/__registry__/` and `public/r/*.json` -- never edit those directly.

### Portfolio Data

All personal/portfolio data lives in `src/features/portfolio/data/`:
- `user.ts` - Core personal info, bio, contact
- `experiences.ts` - Work experience and education
- `projects.ts` - Portfolio projects
- `tech-stack.ts` - Technologies and tools
- `awards.ts`, `certifications.ts`, `social-links.ts`, `testimonials.ts`

### Blog Content

MDX files in `src/features/blog/content/`. Supports custom components, syntax highlighting, and raw `.mdx` endpoints for AI readability.

## Code Conventions

- **Path alias**: `@/*` maps to `./src/*`
- **Imports**: `eslint-plugin-simple-import-sort` enforced -- imports must be sorted
- **Type imports**: `@typescript-eslint/consistent-type-imports` enforced -- use `import type` for type-only imports
- **File naming**: kebab-case
- **Styling**: Tailwind CSS v4 with CSS variables, zinc-based color scheme, dark/light mode support
- **shadcn/ui style**: `new-york` variant, Lucide icons, RSC-compatible
- **State management**: Jotai for atoms, `nuqs` for URL query state
- **Animations**: Motion (Framer Motion) library
- **No emojis** in code, comments, or commit messages
- **Husky + lint-staged** for pre-commit hooks

## Environment Variables

Copy `.env.example` to `.env.local`. Key variables:
- `APP_URL` - Base URL
- `REGISTRY_NAMESPACE` / `REGISTRY_NAMESPACE_URL` - shadcn registry namespace
- `GITHUB_API_TOKEN` - GitHub API access
- `NEXT_PUBLIC_POSTHOG_KEY/HOST` - PostHog analytics (production only)
- `NEXT_PUBLIC_OPENPANEL_CLIENT_ID` - OpenPanel analytics

## Analytics

Events defined in `src/lib/events.ts` with Zod schema validation. PostHog initialized in `src/instrumentation-client.ts` (production only). Consent management via `@c15t/nextjs`.
