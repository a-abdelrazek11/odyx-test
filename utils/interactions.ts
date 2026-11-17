import type { Locator } from "@playwright/test";

export async function click(locator: Locator): Promise<void> {
  await locator.click();
}

export async function fill(locator: Locator, value: string): Promise<void> {
  await locator.fill(value);
}

export async function selectOption(locator: Locator, value: string): Promise<void> {
  await locator.selectOption(value);
}
