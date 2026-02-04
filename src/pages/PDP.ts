import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";
import { Cart } from "./Cart";

export class PDP extends BasePage {
  readonly inventoryList: Locator;
  readonly sauceLabsBackpackItem: Locator;
  readonly shoppingCartIcon: Locator;
  readonly cartIcon: Locator;
  readonly cartIconBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryList = this.page.locator('[data-test="inventory-container"]');
    this.sauceLabsBackpackItem = this.page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    this.shoppingCartIcon = this.page.locator("#shopping_cart_container");
    this.cartIcon = this.page.locator('[data-test="shopping-cart-link"]');
    this.cartIconBadge = this.page.locator('[data-test="shopping-cart-badge"]');
  }

  async clickItem() {
    let oldCartBadge = "";
    if ((await this.cartIconBadge.count()) > 0) {
      oldCartBadge = (await this.cartIconBadge.textContent()) || "";
    }

    await this.sauceLabsBackpackItem.click();
    await this.page.waitForTimeout(300);
    const newCartBadge = await this.cartIconBadge.textContent();

    if (oldCartBadge) {
      expect(Number(newCartBadge)).toBeGreaterThan(Number(oldCartBadge));
    } else {
      expect(Number(newCartBadge)).toEqual(1);
    }

    await this.cartIcon.click();

    const cartPage = new Cart(this.page);

    await cartPage.cartItems
      .nth(0)
      .waitFor({ state: "visible", timeout: 5000 });
  }
}
