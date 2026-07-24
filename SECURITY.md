# Security Policy

Fabrigent publishes protocol contracts and governance policy. Security
reports are handled as operational facts, not public claims.

## Supported State

The repository is in its initial `v1` contract line. Security fixes target
the current source tree on `main`; previously published artifact versions are
immutable and are superseded by new versions rather than patched in place.

## Reporting A Vulnerability

Do not report vulnerabilities through public issues.

Use the repository host's private vulnerability reporting at
<https://github.com/LicoLand/Fabrigent/security>. Include enough technical
evidence for triage:

- the affected contract, policy, corpus, or tool;
- reproduction steps or a synthetic failing example;
- expected and actual behavior;
- impact on implementations that pin the affected artifact version;
- a suggested fix, when available.

## In Scope

- The relay envelope contract and its schema invariants.
- Governance policy capability and limit definitions.
- Conformance corpus correctness and synthetic-fixture hygiene.
- Artifact digest generation and verification in `tools/`.
- Accidental disclosure of secrets, personal data, endpoints, or runtime
  material in tracked content.

## Out Of Scope

- Implementation vulnerabilities in LicoUp clients or BadTower relays, which
  are owned by their respective repositories.
- Social engineering against maintainers or users.
- Reports that require real secrets, private payloads, or private runtime
  data to be disclosed publicly.
