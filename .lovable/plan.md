## Goal
Confirm the AI Coach (`/analyze`) is functioning end-to-end by invoking the `analyze-technique` edge function with a real request and checking the AI Gateway path.

## Steps

1. **Send a synthetic request** to `analyze-technique` via `supabase--curl_edge_functions` using the logged-in preview session:
   - Method: `POST`
   - Body: a tiny valid base64 test image (1x1 PNG) plus `frameLabel: "test"`
   - Expect: HTTP 200 with JSON containing `overallScore`, `strengths`, `improvements`, `keyRecommendation`, `techniquesIdentified`

2. **Cross-check backend telemetry** immediately after:
   - `supabase--edge_function_logs` for `analyze-technique` — confirm the invocation logged, look for errors
   - `ai_gateway_logs--list_ai_gateway_requests` — verify the call reached `google/gemini-2.5-flash`, capture status + latency + token usage

3. **Interpret & report** to the user:
   - ✅ 200 + gateway success → AI Coach is healthy; share model, latency, and cost
   - ⚠️ 401 → auth path issue (session not attached)
   - ⚠️ 402 → workspace out of AI credits
   - ⚠️ 429 → rate-limited, retry guidance
   - ⚠️ 5xx or parse fallback → surface exact error from logs

## Deliverable
A short status summary: pass/fail, model used, response time, any warnings, and (if failing) the specific root cause with a proposed fix — no code changes made in this pass unless a defect is confirmed.

## Notes
- Read-only diagnostic: no schema, code, or config changes in this plan.
- If a defect is found, I'll come back with a separate fix plan before editing anything.