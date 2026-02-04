import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";
import { CHECKOUT_INFO } from "../constants/constants";
import { sanitizePrice } from "../helpers/sanitize-price.helper";

export class Checkout extends BasePage {
  readonly checkoutInfoContainer: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;

  //summary info
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;

  readonly continueButton: Locator;
  readonly itemPrice: Locator;
  readonly checkoutSummaryContainer: Locator;
  readonly finishButton: Locator;
  readonly checkoutCompleteContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutInfoContainer = this.page.locator(
      '[data-test="checkout-info-container"]',
    );

    //form inputs
    this.firstNameInput = this.page.locator('[data-test="firstName"]');
    this.lastNameInput = this.page.locator('[data-test="lastName"]');
    this.zipCodeInput = this.page.locator('[data-test="postalCode"]');

    this.continueButton = this.page.locator('[data-test="continue"]');

    //summary info
    this.paymentInfo = this.page.locator('[data-test="payment-info-value"]');
    this.shippingInfo = this.page.locator('[data-test="shipping-info-value"]');
    this.subtotal = this.page.locator('[data-test="subtotal-label"]');
    this.tax = this.page.locator('[data-test="tax-label"]');
    this.total = this.page.locator('[data-test="total-label"]');

    this.itemPrice = this.page.locator('[data-test="inventory-item-price"]');
    this.checkoutSummaryContainer = this.page.locator(
      '[data-test="checkout-summary-container"]',
    );
    this.finishButton = this.page.locator('[data-test="finish"]');
    this.checkoutCompleteContainer = this.page.locator(
      '[data-test="checkout-complete-container"]',
    );
  }

  async fillFormInputs() {
    await this.firstNameInput.fill(CHECKOUT_INFO.first_name);
    await this.lastNameInput.fill(CHECKOUT_INFO.last_name);
    await this.zipCodeInput.fill(CHECKOUT_INFO.zip);
  }

  async clickContinue() {
    await this.continueButton.click();
    await this.checkoutSummaryContainer.waitFor({
      state: "visible",
      timeout: 5000,
    });
  }

  async validateSummaryInfoVisibility() {
    await expect(this.paymentInfo).toBeVisible();
    await expect(this.shippingInfo).toBeVisible();
    await expect(this.subtotal).toBeVisible();
    await expect(this.tax).toBeVisible();
    await expect(this.total).toBeVisible();
  }

  async validateTotal() {
    const itemCount = await this.itemPrice.count();

    const prices = [];

    for (let i = 0; i < itemCount; i++) {
      const extractedPrice = await sanitizePrice(this.itemPrice.nth(i));
      prices.push(extractedPrice);
    }

    const totalSum = prices.reduce((a, b) => a + b, 0);
    const subtotal = Number((await this.subtotal.innerHTML()).split("$")[1]);

    console.log("TOTAL SUM: ", totalSum);
    console.log("SUBTOTAL: ", subtotal);

    //subtotal
    expect(subtotal).toEqual(totalSum);

    //subtotal + tax = total
    const tax = await sanitizePrice(this.tax);
    const total = await sanitizePrice(this.total);
    const expectedTotal = totalSum + tax;

    console.log("TOTAL WITH TAX: ", expectedTotal);
    expect(expectedTotal).toEqual(total);
  }

  async clickFinishButton() {
    await this.finishButton.click();
    await this.checkoutCompleteContainer.waitFor({
      state: "visible",
      timeout: 5000,
    });

    await expect(this.checkoutCompleteContainer).toBeVisible();
  }
}
