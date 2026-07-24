# Fabrigent Compatibility Policy

## Versioning Model

Fabrigent publishes versioned contract lines. Each line lives in its own
directories (`contracts/v1/`, `policies/v1/`, `conformance/v1/`) and is
bundled into an immutable, content-addressed artifact
(`artifacts/fabrigent-v1.json`). The wire contract identifies itself with
the `contractVersion` constant, currently `fabrigent.relay.v1`.

## Rules

- A published version directory is immutable. Corrections and extensions
  ship as a new version.
- Implementations pin an exact artifact and verify its `digest` (SHA-256
  over the canonical serialization of the embedded sources) before relying
  on its contents.
- Consumers must treat `additionalProperties: false` as normative: an
  envelope with unknown fields is non-conformant.
- The governance policy's required capabilities are the minimum a conformant
  relay deployment supports; the forbidden capabilities must never appear.

## Compatibility Guarantees

- Within a version line, the schema, policy, and corpus never change; the
  artifact digest is the integrity proof.
- Across versions, no wire-level compatibility is implied. A consumer that
  supports `fabrigent.relay.v1` must not assume anything about a future
  version until it is published.

## Toolchain

The generator and tests require Node.js 22 or newer, as declared in
[../package.json](../package.json). The toolchain is a maintainer concern
only; consumers need only the artifact JSON.
