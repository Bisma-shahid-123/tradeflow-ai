# Skill: Roman Urdu order parsing
Use when editing /api/parse or lib/ai/.
- Quantities: "ek"=1, "do"=2, "teen"=3, "char"=4, "paanch"=5, "dozen"=12.
- Money: "1k"=1000, "hazaar"=1000, "advance diya"/"paid" = advance amount.
- Addresses: keep block, flat and area text as written; extract area (Gulshan, DHA, Johar) separately.
- If a price or phone is missing, return null with low confidence. Never guess.
- Re-check output against the zod schema before showing the review screen.
