# Angular SSE — Real-Time Streaming Lab

This repository started as an Angular Server-Sent Events experiment. It is now being treated as an implementation lab for **real-time delivery, streaming failure modes and browser-based execution**.

## What is being explored

```text
Producer / backend
       |
       | event stream
       v
Server-Sent Events
       |
       v
Angular client
       |
       +--> render
       +--> reconnect
       +--> recover
       +--> observe stale / duplicate / missing events
```

The important engineering question is not simply “how do I use SSE?” It is:

> When is a streaming channel the right boundary, and what must the client and server do when the connection is unreliable?

## Current implementation

The original application uses Angular CLI 10.0.2, Angular 10.x, TypeScript 3.9.x and RxJS 6.5.x. The original README also documents that the client handles the default SSE `message` event type. fileciteturn188file0

The repository is intentionally being modernized incrementally rather than pretending the historical implementation was built with today's stack.

## Failure-first exercises

- connection drops and reconnects
- duplicate events
- delayed events
- stale client state
- event ordering
- server restart
- malformed payloads
- heartbeat / liveness
- backpressure expectations
- observability around connection and event state

## Run locally

```bash
npm install
npm start
```

Then open `http://localhost:4200/`.

## Run in the browser

For a real multi-file Angular project, use a browser development environment rather than a single-file compiler:

- [GitHub Codespaces](https://github.com/features/codespaces) — full browser IDE, terminal and application runtime
- [OneCompiler](https://onecompiler.com/) — useful for isolated JavaScript/TypeScript/SQL exercises
- [JDoodle](https://www.jdoodle.com/online-compiler) — useful for isolated language/compiler exercises

Generic online compilers are useful for interview-style snippets, but the full Angular/SSE application needs a real project runtime.

## Next extension: Kafka

This repository is also the starting point for connecting **browser streaming to event streaming**:

```text
Kafka topic
    |
    v
consumer / stream processor
    |
    v
SSE endpoint
    |
    v
Angular client
```

The Kafka implementation itself lives in the Data Platform Lab in `MountainBridges` until the dedicated `MountainBridge` coding-lab repository is available.

Related lab: `MountainBridges/projects/data-platform-lab/kafka/`.

## Interview questions

1. Why SSE instead of WebSockets or polling?
2. What happens when the browser disconnects for 30 seconds?
3. How do you prevent duplicate state transitions?
4. Where should ordering be enforced?
5. What happens if Kafka publishes an event but the SSE consumer crashes?
6. What is the source of truth when the browser and backend disagree?
7. How would you observe and debug a missing event?

## Evidence standard

Every new experiment should record:

**scenario → implementation → test data → failure injected → observed behaviour → measurement → decision → trade-off**
