import { defineConfig, devices, type Project } from "@playwright/test";
import { optionalEnv } from "./utils/env";

function selectedBrowsers(): string[] {
  const requested = (optionalEnv("TEST_BROWSERS") ?? "chromium")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item === "chromium" || item === "firefox" || item === "webkit");
  const browsers = requested.length ? requested : ["chromium"];
  if (!browsers.includes("chromium")) browsers.unshift("chromium");
  return browsers;
}

function projects(): Project[] {
  const ui: Record<string, Project> = {
    chromium: { name: "ui", testMatch: /ui\/.*\.spec\.ts/, use: { ...devices["Desktop Chrome"] } },
    firefox: { name: "ui-firefox", testMatch: /ui\/.*\.spec\.ts/, use: { ...devices["Desktop Firefox"] } },
    webkit: { name: "ui-webkit", testMatch: /ui\/.*\.spec\.ts/, use: { ...devices["Desktop Safari"] } },
  };
  return [
    { name: "api", testMatch: /api\/.*\.spec\.ts/ },
    ...selectedBrowsers().map((name) => ui[name]),
  ];
}

const workers = optionalEnv("TEST_WORKERS");

export default defineConfig({
  testDir: "./tests",
  outputDir: "./reports/test-results",
  fullyParallel: true,
  retries: Number(optionalEnv("TEST_RETRIES") ?? "0"),
  workers: workers ? Number(workers) : undefined,
  timeout: Number(optionalEnv("TEST_TIMEOUT") ?? "30000"),
  reporter: [["html", { outputFolder: "reports/html", open: "never" }], ["list"]],
  use: {
    baseURL: optionalEnv("TEST_APP_URL"),
    headless: (optionalEnv("TEST_HEADLESS") ?? "true") !== "false",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: Number(optionalEnv("TEST_ACTION_TIMEOUT") ?? "10000"),
  },
  projects: projects(),
});
