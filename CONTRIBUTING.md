# Contributing To Fabrigent

Fabrigent is a protocol and policy authority. Changes here redefine what
every implementation must follow, so contributions are held to deterministic,
reviewable, and privacy-safe standards.

## Ground Rules

- Never commit real user data, secrets, endpoints, or runtime material.
  Examples and fixtures must be synthetic.
- Keep the repository boundary: no client encryption or key-custody material
  (LicoUp), and no relay implementation, storage, or runtime operations
  (BadTower).
- Protocol and policy changes are versioned. Do not mutate a published
  version directory in place; add a new version instead. See
  [docs/COMPATIBILITY.md](docs/COMPATIBILITY.md).

## Workflow

1. Create a branch with a meaningful prefix such as `feature/` or `fix/`.
2. Make the change. Contract edits go in `contracts/`, policy edits in
   `policies/`, corpus edits in `conformance/`.
3. Regenerate the bundle with `npm run artifacts:generate`.
4. Run `npm run verify` and make sure the artifact check and all tests pass.
5. Update the formal documentation that owns the changed fact in the same
   change, and add a [CHANGELOG.md](CHANGELOG.md) entry.
6. Open a pull request against `main`.

## Verification Commands

- `npm run artifacts:check` — the tracked artifact matches its canonical
  sources.
- `npm test` — schema, corpus, and policy conformance tests.
- `npm run verify` — both of the above.

## License

Contributions are licensed under GPL-3.0-or-later, the repository license.
