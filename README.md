# Fabrigent

Fabrigent is LicoLand's neutral authority for versioned federation transport
contracts and governance policy. Implementations consume immutable,
content-addressed artifacts instead of importing this repository's source.

The current `v1` contract defines opaque relay envelopes, mailbox leases,
quotas, acknowledgements, and cleanup. It deliberately excludes client keys,
encryption, decryption, plaintext, local approval, host permissions, and
client-runtime coordination. LicoUp owns its end-to-end encryption and key
custody.

Run `npm run verify` to validate the generated artifact and conformance corpus.

License: GPL-3.0-or-later.
