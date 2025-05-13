// ANCHOR: full
import 'package:nostr_sdk/nostr_sdk.dart';

Future<void> fetch() async {
  // ANCHOR: client
  Client client = Client();

  await client.addRelay(url: "wss://relay.damus.io");
  await client.connect();
  // ANCHOR_END: client

  // ANCHOR: fetch
  Filter filter1 = Filter().kind(kind: 0).limit(limit: BigInt.from(3));
  Events events1 = await client.fetchEvents(filter: filter1, timeout: Duration(seconds: 10));
  // ANCHOR_END: fetch

  print("Fetched ${events1.len()} events");

  // ANCHOR: fetch-from
  Filter filter2 = Filter().kind(kind: 1).limit(limit: BigInt.from(5));
  Events events2 = await client.fetchEventsFrom(urls: ["wss://relay.damus.io"], filter: filter2, timeout: Duration(seconds: 10));
  // ANCHOR_END: fetch-from

  print("Fetched ${events2.len()} events");
}
// ANCHOR_END: full
