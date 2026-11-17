import { readFileSync } from "fs";
import { join } from "path";
import { optionalEnv } from "./env";

export function loadTestData(): Record<string, unknown> {
  const env = (optionalEnv("TEST_ENV") ?? "shared").toLowerCase();
  const name = env === "qa" ? "qa.json" : "example.json";
  try {
    const text = readFileSync(join(__dirname, "..", "test-data", name), "utf8");
    const parsed = JSON.parse(text) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed as Record<string, unknown>;
  } catch {
    return {};
  }
}
