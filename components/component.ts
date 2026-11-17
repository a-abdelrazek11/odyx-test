import type { Locator, Page } from "@playwright/test";

export class Component {
  constructor(protected readonly page: Page, protected readonly root: Locator) {}

  locator(selector: string): Locator {
    return this.root.locator(selector);
  }
}
