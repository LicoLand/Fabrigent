# Relay Envelope Contract v1

The canonical machine-readable authorities for this contract are
[../../contracts/v1/relay-envelope.schema.json](../../contracts/v1/relay-envelope.schema.json)
(JSON Schema draft 2020-12, `$id`
`https://licoarc.com/contracts/v1/relay-envelope.schema.json`) and
[../../policies/v1/relay-governance.json](../../policies/v1/relay-governance.json).
This document projects those authorities for human readers.

## Envelope Fields

`contractVersion` is the constant `fabrigent.relay.v1`. All five fields are
required, and `additionalProperties` is `false`: any other field, including
any plaintext field, makes the envelope non-conformant.

| Field | Type | Rule |
| --- | --- | --- |
| `envelopeId` | string | 16-128 characters from `A-Z`, `a-z`, `0-9`, `_`, `-` |
| `mailboxId` | string | 16-128 characters from `A-Z`, `a-z`, `0-9`, `_`, `-` |
| `ciphertext` | string | 1 to 1048576 characters, opaque to relays |
| `expiresAt` | string | `date-time` format |

## Governance Policy

`fabrigent.relay-governance.v1` declares the trust model
`relay-is-untrusted`.

Required capabilities of a conformant relay deployment:

- `opaque-envelope-relay`
- `mailbox-lease`
- `quota`
- `acknowledgement`
- `expiry-cleanup`

Forbidden capabilities:

- `client-key-custody`
- `encryption`
- `decryption`
- `plaintext-inspection`
- `host-permission-authority`
- `client-runtime-coordination`

## Limits

| Limit | Value |
| --- | --- |
| `maxCiphertextBytes` | 1048576 |
| `maxLeaseSeconds` | 86400 |
| `maxMailboxEnvelopes` | 1000 |

## Conformance

Synthetic positive and negative cases live in
[../../conformance/v1/valid.json](../../conformance/v1/valid.json) and
[../../conformance/v1/invalid.json](../../conformance/v1/invalid.json); see
[../examples/relay-envelope-examples.md](../examples/relay-envelope-examples.md)
for a walkthrough.
