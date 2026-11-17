import type { Locator, Page } from "@playwright/test";

export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path = "/"): Promise<void> {
    await this.page.goto(path);
  }

  locator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
