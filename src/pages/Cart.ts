import { Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";
import { Checkout } from "./Checkout";

export class Cart extends BasePage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = this.page.locator('[data-test="inventory-item"]');
    this.checkoutButton = this.page.locator('[data-test="checkout"]');
  }

  async hasCartItems() {
    return (await this.cartItems.count()) > 0;
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();

    const checkout = new Checkout(this.page);

    await checkout.checkoutInfoContainer.waitFor({
      state: "visible",
      timeout: 5000,
    });
  }
}
