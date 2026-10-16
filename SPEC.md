# Product Specification: TradeFlow AI
**The Conversational Operating System for Social-Commerce Merchants**

---

## 1. Executive Summary & Problem Overview

### The Problem
Across emerging markets, over 70% of digital micro-transactions occur outside formal e-commerce storefronts, taking place inside messaging platforms like WhatsApp, Instagram DMs, and voice calls. Millions of independent sellers process thousands of dollars in monthly sales using manual paper notebooks or raw phone notes.

This informal workflow creates critical business vulnerabilities:
* **Severe Human Error:** Orders are split across chaotic chat threads, leading to frequent errors in item variants, quantities, and delivery addresses.
* **Revenue Leakage:** Sellers routinely extend short-term credit (*udhaar*) or Cash-on-Delivery (COD) terms to buyers. Due to manual tracking, **10%–15% of annual revenue is lost** to uncollected balances.
* **Inefficient Logistics:** Preparing daily delivery lists for riders or courier services takes hours of manual address sorting and area grouping.
* **Unprofessional Communication:** Hand-written receipts lower buyer trust and increase order cancellations before fulfillment.

### The Solution
**TradeFlow AI** bridges this operational gap. It acts as an automated digital assistant (*Munshi*) that ingests unstructured chat threads (in English, Roman Urdu, or regional dialects) and 5-second voice notes, converting them into structured order records, area-grouped dispatch manifests, digital ledger entries, and shareable WhatsApp invoices within seconds.

---

## 2. Core Target Audience & Market Relevance

* **Target Users:** Social-commerce merchants, Instagram fashion/boutique sellers, home chefs, local retail distributors, and micro-vendors running chat-first businesses.
* **Geographic Focus:** Mobile-first and chat-dominated commerce markets (starting with Pakistan and South Asia).
* **Primary Value Proposition:** Reduces daily order-entry administrative work by **80%**, eliminates delivery address errors, and recovers lost revenue through automated credit tracking.

---

## 3. Product Features & Architecture

### Key Functional Modules

1. **Multi-Modal Order Ingestion:**
   * **Chat Parsing:** Merchants copy and paste raw chat snippets directly into the application.
   * **Voice Command Processing:** Merchants record a voice note describing an order or debt clearance.
   * **Entity Extraction:** Extracts Customer Name, Phone Number, Delivery Address, Line Items, Quantities, Unit Prices, Advance Payments, and Unpaid Balances.

2. **AI Confidence Guardrail & Verification Screen:**
   * Displays extracted data on a pre-confirmation card before saving.
   * Highlights missing or low-confidence fields (e.g., incomplete street address) in yellow for 1-click merchant correction, eliminating AI hallucination risks in real business operations.

3. **Automated Dispatch & Logistics Optimizer:**
   * Categorizes completed orders by geographic zone or neighborhood (e.g., DHA, Gulshan, Johar), producing a print/share-ready dispatch list for delivery riders.

4. **Digital Khata & Automated Payment Reminders:**
   * Maintains a live ledger of pending COD payments and customer balances.
   * Generates polite, localized payment reminder messages (in Roman Urdu or English) ready to send via WhatsApp with a single tap.

5. **Instant Receipt & Invoice Generator:**
   * Converts confirmed orders into clean, branded digital receipts (PNG/PDF) to share back with buyers for instant confirmation.

---

## 4. Technical Architecture & Tech Stack

* **Frontend Framework:** Next.js (React) / Tailwind CSS — for an ultra-fast, responsive web and mobile experience.
* **Backend & Database:** Supabase (PostgreSQL, Realtime Subscriptions, and Storage for generated invoices).
* **LLM Engine:** OpenAI `gpt-4o-mini` or Google `Gemini 1.5 Flash` — optimized for ultra-fast response times and high extraction accuracy in Roman Urdu and colloquial English.
* **Speech-to-Text:** OpenAI Whisper API — for voice note parsing.
* **Document Rendering:** `@react-pdf/renderer` or `html2canvas` — for dynamic receipt generation.

---

## 5. User Workflow & System Execution

```text
[ Unstructured Input ]
  ├─ Raw WhatsApp/Insta Chat Snippets
  └─ 5-second Voice Notes (Roman Urdu/English)
         │
         ▼
[ TradeFlow AI Parsing Engine ]
  ├─ Entity & Intent Extraction
  ├─ Dialect Normalization (Roman Urdu -> Structured JSON)
  └─ Confidence Score Scoring
         │
         ▼
[ Pre-Confirmation Guardrail Screen ]
  └─ High-confidence auto-filled / Low-confidence highlighted in Yellow
         │
         ▼
[ Actionable Business Outputs ]
  ├─ 📄 Branded WhatsApp Receipt (PDF/Image)
  ├─ 🚚 Area-Grouped Rider Dispatch Sheet
  ├─ 📖 Updated Customer Khata Ledger
  └─ 💬 1-Click WhatsApp Payment Reminder Draft
