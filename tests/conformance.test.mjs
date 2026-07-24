import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const artifact = JSON.parse(
  await readFile(new URL("../artifacts/fabrigent-v1.json", import.meta.url), "utf8")
);
const schema = artifact.sources["contracts/v1/relay-envelope.schema.json"];
const policy = artifact.sources["policies/v1/relay-governance.json"];
const valid = artifact.sources["conformance/v1/valid.json"];
const invalid = artifact.sources["conformance/v1/invalid.json"];

function conforms(value) {
  const required = schema.required.every((key) => Object.hasOwn(value, key));
  const onlyKnown = Object.keys(value).every((key) => Object.hasOwn(schema.properties, key));
  return required &&
    onlyKnown &&
    value.contractVersion === "fabrigent.relay.v1" &&
    typeof value.ciphertext === "string" &&
    value.ciphertext.length > 0;
}

test("artifact digest binds every canonical source", () => {
  const canonical = `${JSON.stringify(artifact.sources)}\n`;
  const digest = createHash("sha256").update(canonical).digest("hex");
  assert.equal(artifact.digest, digest);
});

test("conformance corpus accepts valid and rejects invalid examples", () => {
  assert.ok(valid.every(conforms));
  assert.ok(invalid.every(({ value }) => !conforms(value)));
});

test("governance keeps relays outside encryption and host authority", () => {
  assert.equal(policy.trustModel, "relay-is-untrusted");
  assert.ok(policy.forbiddenCapabilities.includes("encryption"));
  assert.ok(policy.forbiddenCapabilities.includes("client-key-custody"));
  assert.ok(policy.forbiddenCapabilities.includes("host-permission-authority"));
});
