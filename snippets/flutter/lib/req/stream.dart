// ANCHOR: full
import 'package:nostr_sdk/nostr_sdk.dart';

Future<void> stream() async {
  Client client = Client();

  await client.addRelay(url: "wss://relay.damus.io");
  await client.connect();

  // ANCHOR: init-stream
  // TODO: not supported yet
  // ANCHOR_END: init-stream

  // ANCHOR: consume-stream
  // TODO: not supported yet
  // ANCHOR_END: consume-stream
}
// ANCHOR_END: full
