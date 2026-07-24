# Fabrigent Runbook

Operational procedures for maintaining the Fabrigent contract line and its
artifacts. All commands run from the repository root and require Node.js 22
or newer.

## Verify The Repository

```sh
npm run verify
```

This runs `npm run artifacts:check`, which fails unless the tracked bundle
matches its canonical sources, and `npm test`, which runs the conformance
and integrity tests.

## Regenerate The Bundle Artifact

Run after any change under `contracts/`, `policies/`, or `conformance/`:

```sh
npm run artifacts:generate
```

The generator (`tools/generate-artifact.mjs`) embeds the canonical sources
into `artifacts/fabrigent-v1.json` and recomputes the SHA-256 digest over
their canonical JSON serialization. Commit the regenerated artifact together
with its source change. Never hand-edit the artifact.

## Publish A New Contract Version

1. Create a new version directory (for example `contracts/v2/`) instead of
   mutating a published version.
2. Add the policy and conformance corpus for the new version.
3. Extend the generator's source list and artifact name for the new version,
   regenerate, and verify.
4. Update [COMPATIBILITY.md](COMPATIBILITY.md), the protocol document under
   `docs/protocols/`, and [../CHANGELOG.md](../CHANGELOG.md) in the same
   change.

## Diagnose A Failing Artifact Check

`npm run artifacts:check` fails when a canonical source changed without
regenerating the bundle. Regenerate, review the resulting diff, and rerun
`npm run verify`. If the failure persists, the artifact was edited by hand;
restore it with `npm run artifacts:generate`.
