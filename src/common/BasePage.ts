import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly baseUrl: string;

  constructor(page: Page, baseUrl: string = process.env.BASE_URL as string) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  // put needed custom global functions here

  async loginToApplicationWithTosToken(): Promise<void> {
    await this.page.context().addCookies([
      {
        name: "session-username",
        value: "standard_user",
        url: process.env.BASE_URL as string,
      },
    ]);
  }
}
