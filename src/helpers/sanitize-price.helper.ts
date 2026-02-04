import { Locator } from "@playwright/test";

export async function sanitizePrice(price: Locator) {
  return Number((await price.innerHTML()).split("$")[1]);
}
