import { test as base, expect, request as playwrightRequest, type APIRequestContext, type Page } from "@playwright/test";
import { apiUrl, appUrl, credentials, targetEnv } from "../config/environment";
import { loadTestData } from "../utils/testData";

type FrameworkFixtures = {
  appConfig: { appUrl?: string; apiUrl?: string; env?: string };
  testData: Record<string, unknown>;
  apiContext: APIRequestContext;
  authenticatedPage: Page;
};

export const test = base.extend<FrameworkFixtures>({
  appConfig: async ({}, use) => {
    await use({ appUrl: appUrl(), apiUrl: apiUrl(), env: targetEnv() });
  },
  testData: async ({}, use) => {
    await use(loadTestData());
  },
  apiContext: async ({}, use) => {
    const context = await playwrightRequest.newContext({ baseURL: apiUrl() });
    await use(context);
    await context.dispose();
  },
  authenticatedPage: async ({ page }, use) => {
    const account = credentials();
    const url = appUrl();
    if (!account || !url) {
      throw new Error("An authenticated test needs TEST_APP_URL, TEST_EMAIL, and TEST_PASSWORD.");
    }
    await page.goto(url);
    await use(page);
  },
});

export { expect };
