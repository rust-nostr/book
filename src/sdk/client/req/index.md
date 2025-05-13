## Requesting events

In this chapter we'll cover the four ways to request events to relays:
- [fetching](fetch.md): request the events and wait until all relays return the result.
- [streaming](stream.md): request and immediately receive the events; terminate the stream when all relays satisfy the exit condition.
- [syncing](sync.md): execute a negentropy reconciliation, which will request only the missing events.
- [subscribing](subscribe.md): create a long-lived subscription to receive updates in real-time.
