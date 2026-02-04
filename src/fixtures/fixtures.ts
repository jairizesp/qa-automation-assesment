import { test as base } from "@playwright/test";

type Fixtures = {
  loginWithSessionToken: void;
};

export const test = base.extend<Fixtures>({
  loginWithSessionToken: [
    async ({ page, context }, use) => {
      const sessionToken = process.env.SESSION_TOKEN;

      if (!sessionToken) {
        throw new Error("SESSION_TOKEN environment variable is not set");
      }

      await context.addCookies([
        {
          name: "session-username",
          value: sessionToken,
          url: process.env.BASE_URL as string,
        },
      ]);

      console.log("Session token injected via fixture");

      await use();
    },
    { option: true },
  ],
});
