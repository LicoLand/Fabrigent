# Artifact And Conformance Verification

This document describes the implemented verification behavior of the
repository. The executable authorities are
[../../tools/generate-artifact.mjs](../../tools/generate-artifact.mjs) and
[../../tests/conformance.test.mjs](../../tests/conformance.test.mjs).

## Artifact Integrity

`npm run artifacts:check` regenerates the expected bundle in memory and
fails if the tracked
[../../artifacts/fabrigent-v1.json](../../artifacts/fabrigent-v1.json)
differs. The test suite additionally re-derives the SHA-256 digest from the
embedded `sources` and compares it to the recorded `digest`, proving the
digest binds every canonical source.

## Conformance Corpus

The corpus is synthetic:

- `conformance/v1/valid.json` lists envelopes that must conform.
- `conformance/v1/invalid.json` lists named negative cases — currently a
  forbidden `plaintext` field and a missing `ciphertext` — that must not
  conform.

The test harness evaluates each case against the embedded schema: all
required fields present, no unknown fields, the `contractVersion` constant,
and a non-empty `ciphertext` string.

## Policy Guardrails

A dedicated test asserts the trust model `relay-is-untrusted` and that the
forbidden capabilities include `encryption`, `client-key-custody`, and
`host-permission-authority`, keeping relays outside encryption and host
authority by construction.

## Commands

| Command | Behavior |
| --- | --- |
| `npm run artifacts:generate` | Rewrite the bundle from canonical sources |
| `npm run artifacts:check` | Fail if the tracked bundle is stale |
| `npm test` | Run the conformance and integrity tests |
| `npm run verify` | Artifact check plus tests |
