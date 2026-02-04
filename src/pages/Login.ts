import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";
import { PDP } from "./PDP";

export class Login extends BasePage {
  readonly loginFormContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.loginFormContainer = this.page.locator("#login_button_container");
  }

  async navigateToLogin() {
    await this.page.goto("/");
    await this.loginFormContainer.waitFor({ state: "visible", timeout: 5000 });
    await this.page.goto("inventory.html");

    const pdp = new PDP(this.page);

    await pdp.inventoryList.waitFor({ state: "visible", timeout: 5000 });

    await expect(pdp.inventoryList).toBeVisible();
  }
}
