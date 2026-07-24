# Fabrigent Architecture Overview

Fabrigent is not a running system; it is a build-time authority that turns
human-reviewed protocol sources into immutable, verifiable artifacts.

## Components

```text
contracts/v1/   policies/v1/   conformance/v1/
       \            |            /
        tools/generate-artifact.mjs
                    |
        artifacts/fabrigent-v1.json
                    |
        tests/conformance.test.mjs
```

- **Canonical sources.** The envelope schema
  (`contracts/v1/relay-envelope.schema.json`), the governance policy
  (`policies/v1/relay-governance.json`), and the synthetic conformance
  corpus (`conformance/v1/valid.json`, `conformance/v1/invalid.json`) are
  the only inputs.
- **Bundle artifact.** `tools/generate-artifact.mjs` parses the sources,
  embeds them under `sources`, and computes `digest` as SHA-256 over the
  canonical JSON serialization plus a trailing newline. The artifact
  identifies itself as `fabrigent.bundle.v1` with `digestAlgorithm`
  `sha256`.
- **Verification.** `npm run artifacts:check` regenerates the expected
  bundle and compares it byte-for-byte; `npm test` re-derives the digest
  and evaluates the corpus against the embedded schema and policy.

## Trust Model

The policy declares `relay-is-untrusted`. The contract carries only opaque
ciphertext and routing metadata; encryption, decryption, key custody,
plaintext inspection, host permission authority, and client-runtime
coordination are forbidden capabilities by policy. See
[../protocols/relay-envelope-v1.md](../protocols/relay-envelope-v1.md).

## Boundaries

- LicoUp owns endpoint encryption, key custody, local approval, and client
  behavior.
- BadTower owns relay implementation, storage, mailbox operation, leases,
  quotas, acknowledgements, and cleanup execution.
- Fabrigent owns only the neutral contract, the governance policy, the
  conformance corpus, and the artifact pipeline described above.
