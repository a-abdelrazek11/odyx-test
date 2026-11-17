import type { Locator, Page } from "@playwright/test";

export function byTestId(page: Page, testId: string): Locator {
  return page.getByTestId(testId);
}

export function byLabel(page: Page, label: string): Locator {
  return page.getByLabel(label);
}

export function byRole(page: Page, role: "button" | "link" | "textbox", name: string): Locator {
  return page.getByRole(role, { name });
}
