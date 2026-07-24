import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePaths = [
  "contracts/v1/relay-envelope.schema.json",
  "policies/v1/relay-governance.json",
  "conformance/v1/valid.json",
  "conformance/v1/invalid.json"
];

const sources = Object.fromEntries(
  await Promise.all(sourcePaths.map(async (relativePath) => [
    relativePath,
    JSON.parse(await readFile(path.join(root, relativePath), "utf8"))
  ]))
);
const canonical = `${JSON.stringify(sources)}\n`;
const digest = createHash("sha256").update(canonical).digest("hex");
const artifact = `${JSON.stringify({
  artifactVersion: "fabrigent.bundle.v1",
  digestAlgorithm: "sha256",
  digest,
  sources
}, null, 2)}\n`;
const output = path.join(root, "artifacts", "fabrigent-v1.json");

if (process.argv.includes("--check")) {
  const current = await readFile(output, "utf8").catch(() => "");
  if (current !== artifact) {
    throw new Error("Fabrigent artifact is missing or stale");
  }
} else {
  await writeFile(output, artifact);
}
