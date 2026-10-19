# TradeFlow AI
The Conversational Operating System for Social-Commerce Merchants.

Sellers who take orders on WhatsApp and Instagram paste a messy chat (English or Roman Urdu). TradeFlow AI extracts the order, the seller reviews and confirms it, and the app produces a saved order, a customer Khata (credit ledger), an area-grouped dispatch list, a printable receipt and a Roman Urdu payment reminder.

## Features
- Paste-a-chat order extraction with confidence highlighting
- Review screen: nothing saves until the seller confirms
- Customer Khata with balances and payment reminders
- Dispatch list grouped by area
- Printable receipts with a WhatsApp text copy button
- Sign up with mandatory 2FA; each account sees only its own data

## Stack
Next.js, TypeScript, Tailwind CSS, Supabase (Postgres, Auth with TOTP 2FA), zod, a hosted LLM (see AI_DISCLOSURE.md).

## Live demo
URL: to be added after deployment.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in at least `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and one AI key (`OPENAI_API_KEY`, `GEMINI_API_KEY` or `ANTHROPIC_API_KEY`) plus `AI_MODEL`. `SUPABASE_SERVICE_ROLE_KEY` is not required and not available in the preview; the app uses RLS with the signed-in user's anon key.
3. The core schema migration is already applied to the linked Supabase project; for a fresh project, run `supabase/schema.sql`
4. `npm run dev`

## Docs
- `SPEC.md` — product spec
- `AGENTS.md` — AI agent instructions
- `AI_DISCLOSURE.md` — AI tools and components used

## Running the Project

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Testing the Auth Flow

- Sign up with email and password, and username
- After sign up, scan the QR code with an authenticator app and verify the TOTP
- Sign out
- Sign in again, enter the TOTP code to verify
- Access to protected routes redirects to sign-in if not authenticated

## Build and TypeScript Validation

The project has been fixed to pass all Next.js build checks and TypeScript validations with no errors or warnings.

---

This project uses Supabase Auth for authentication and MFA, Next.js App Router with TypeScript, and Tailwind CSS with shadcn/ui components.
