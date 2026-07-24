# ADR 0001: Immutable, Versioned, Content-Addressed Artifacts

Status: implemented (initial `v1` contract line).

## Context

Multiple independent implementations (clients and relays) must agree on the
federation contract without importing each other's source or this
repository's tooling. A mutable specification leaves "which contract did you
implement" unanswerable.

## Decision

- Contracts, policies, and conformance corpora live in versioned directories
  (`contracts/v1/`, `policies/v1/`, `conformance/v1/`).
- A generator bundles the canonical sources into a single artifact
  (`artifacts/fabrigent-v1.json`) whose SHA-256 `digest` binds the exact
  canonical serialization of every source.
- Published versions are immutable; changes ship as a new version. See
  [../COMPATIBILITY.md](../COMPATIBILITY.md).
- Consumers pin an artifact version and verify its digest instead of
  importing this repository's source.

## Consequences

- Integrity verification is a digest comparison, not a source audit.
- Every source change requires regenerating the bundle; the
  `npm run artifacts:check` gate fails otherwise. See
  [../RUNBOOK.md](../RUNBOOK.md).
- The authoritative machine-readable definition remains the schema and
  policy files, projected by
  [../protocols/relay-envelope-v1.md](../protocols/relay-envelope-v1.md).
