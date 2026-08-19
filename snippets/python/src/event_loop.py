import asyncio
from typing import cast

from nostr_sdk import uniffi_set_event_loop


async def configure_event_loop() -> None:
    loop = cast(asyncio.BaseEventLoop, asyncio.get_running_loop())
    uniffi_set_event_loop(loop)
