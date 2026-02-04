import { expect } from "@playwright/test";
import { test } from "../src/fixtures/fixtures";
import { Cart, Checkout, Login, PDP } from "../src/pages";

test.describe(() => {
  test("should execute e2e test", async ({ page, loginWithSessionToken }) => {
    await test.step("should login with session token", async () => {
      const login = new Login(page);
      await login.navigateToLogin();
    });

    await test.step("should add item to cart", async () => {
      const pdp = new PDP(page);
      await pdp.clickItem();
    });

    await test.step("should check cart items", async () => {
      const cart = new Cart(page);

      expect(cart.hasCartItems()).toBeTruthy();

      await cart.clickCheckoutButton();
    });

    await test.step("should complete checkout flow", async () => {
      const checkout = new Checkout(page);
      await test.step("should fill up information form", async () => {
        await checkout.fillFormInputs();
        await checkout.clickContinue();
      });

      await test.step("should validate checkout information", async () => {
        await checkout.validateSummaryInfoVisibility();
        await checkout.validateTotal();
        await checkout.clickFinishButton();
      });
    });
  });
});
