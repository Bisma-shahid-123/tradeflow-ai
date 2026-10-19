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
Next.js, TypeScript, Tailwind, shadcn/ui, Supabase (Postgres, Auth with TOTP 2FA), zod, a hosted LLM (see AI_DISCLOSURE.md).

## Live demo
URL: to be added after deployment.

## Setup
1. npm install
2. Copy .env.example to .env.local and fill in the values
3. Run supabase/schema.sql in your Supabase project
4. npm run dev

## Docs
SPEC.md (product spec), AGENTS.md (AI agent instructions), AI_DISCLOSURE.md (AI tools and components used)
