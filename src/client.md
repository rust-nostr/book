# Client and relays

`Client` owns the relay pool, the configured database, subscriptions, and the notification stream. Reuse one client
while those resources should remain active; creating a new client also creates a new pool and loses its connection and
subscription state.

Each relay in the pool has its own connection state and operation result. One relay may accept an event while another
rejects it or is offline, so multi-relay operations return successful and failed relay outcomes instead of one boolean.

## Build the client

`Client::default` and the equivalent binding constructors use in-memory storage. Use `ClientBuilder` when the client
needs a persistent database or other pool-wide configuration.

The client transports and stores signed events. Signing remains separate: produce an `Event` with `Keys` or another
signer, then pass that event to the client.

Adding a relay registers it with the pool; `connect` starts managed connection and reconnection work. Operations still
report availability per relay.

## Select relays

A relay can be configured for read, write, discovery, or synchronization work. Request targets then choose the relays
for one operation:

- automatic targets use eligible relays from the pool;
- explicit targets restrict an operation to selected relays;
- manual targets can associate different filters with different relays.

Capabilities are persistent pool configuration; a request target applies only to one request. Use explicit targets
when a specific relay is part of the operation's requirement. Otherwise, let the client resolve the pool target.

The next chapter enables [gossip](gossip.md), allowing automatic targets to select relays from discovered NIP-65 and
NIP-17 lists.

## Operation outputs

Publishing and subscription setup return the main value together with per-relay success and failure maps. Inspect
those maps before declaring the operation successful. Acceptance by one relay, every configured relay, or a specific
relay are different guarantees, and the SDK does not choose one for the application.

When retrying a publication, reuse the same signed `Event`. Rebuilding it normally changes its timestamp and event ID.

## Database and cleanup

The relay pool moves events; the database stores and queries them. A local query does not contact a relay, and a
successful query does not say whether the event is still available remotely. The next chapter configures a persistent
[database](database.md).

No explicit shutdown is required. Dropping the client stops its relay connections and background tasks. Use
`disconnect` only when connections should stop while the client remains available, and unsubscribe when one live
subscription ends before the client does.

Invalid URLs and request construction fail the operation directly. Relay-specific failures can coexist with successful
results from other relays, so preserve that distinction when handling an output.

The following chapters cover [streaming](stream.md), [collecting](fetch.md), and
[live subscriptions](subscribe.md).
