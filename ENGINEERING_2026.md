# 2026 Engineering Evidence

This repository is a historical Angular/SSE experiment. Its durable engineering value is the realtime interaction model, not the age of the framework.

## Engineering questions

- How are long-lived streams represented in application state?
- What happens on disconnect, reconnect, duplicate events, or stale data?
- How are loading, empty, error, and degraded states exposed to users?
- How is stream health observed in production?

A modern implementation should add typed event contracts, explicit reconnect/backoff policy, observability, failure injection, and integration tests.

## Reproduce

```bash
npm ci --legacy-peer-deps
npm run build -- --configuration production
npm test -- --watch=false --browsers=ChromeHeadless
```
