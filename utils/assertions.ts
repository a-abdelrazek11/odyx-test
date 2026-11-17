import { expect, type APIResponse, type Locator } from "@playwright/test";

export async function expectVisible(locator: Locator): Promise<void> {
  await expect(locator).toBeVisible();
}

export async function expectHidden(locator: Locator): Promise<void> {
  await expect(locator).toBeHidden();
}

export function expectOk(response: APIResponse): void {
  expect(response.ok()).toBe(true);
}

export function expectRejected(response: APIResponse): void {
  expect(response.ok()).toBe(false);
}
