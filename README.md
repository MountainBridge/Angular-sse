# Angular SSE — Real-Time Streaming Lab

> A historical Angular Server-Sent Events experiment turned into an interview-ready case study for realtime delivery and unreliable connections.

## 30-second read

The interesting problem is not “how do I use SSE?” It is **how do I maintain correct client state when a streaming channel is unreliable?**

```text
Producer / backend
       |
       | event stream
       v
   SSE endpoint
       |
       v
 Angular client
       |
       +--> render
       +--> reconnect
       +--> deduplicate
       +--> recover
       +--> observe
```

## What this demonstrates

- Server-Sent Events
- Angular + RxJS reactive state
- streaming connection lifecycle
- reconnect/recovery thinking
- event ordering and duplicate handling
- realtime observability considerations

The original application uses Angular CLI 10.0.2, Angular 10.x, TypeScript 3.9.x and RxJS 6.5.x. The historical stack is intentionally documented rather than disguised as a modern implementation.

## Run it online

**[Open in GitHub Codespaces](https://codespaces.new/MountainBridge/Angular-sse)** — recommended full-project runtime.

**[Open in StackBlitz](https://stackblitz.com/github/MountainBridge/Angular-sse)** — browser playground. For this historical Angular/SSE stack, use Codespaces when StackBlitz encounters version constraints.

## Run locally

```bash
npm install --legacy-peer-deps
npm start
```

Then open `http://localhost:4200/`.

## Failure matrix

| Failure injected | Expected engineering response |
|---|---|
| connection drop | reconnect without corrupting state |
| duplicate event | idempotent client handling |
| delayed event | detect stale state / ordering issue |
| malformed payload | reject safely and surface telemetry |
| server restart | recover stream and reconcile state |
| missed events | define replay/resynchronization strategy |
| heartbeat loss | distinguish dead connection from idle stream |

## Kafka extension

The natural production evolution is:

```text
Kafka topic → consumer/stream processor → SSE endpoint → Angular client
```

That connects this repository to the dedicated Kafka Event Platform rather than pretending browser SSE itself solves durable event delivery.

## Interview prompts

1. Why SSE instead of WebSockets or polling?
2. What happens when the browser disconnects for 30 seconds?
3. How do you prevent duplicate state transitions?
4. Where should ordering be enforced?
5. What is the source of truth after a reconnect?
6. How would you observe a missing event?
7. When should the browser resync from an API instead of replaying events?
