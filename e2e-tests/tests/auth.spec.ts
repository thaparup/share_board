import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.describe("User sign up and login", () => {
  test("user to sign up first and logged in after", async ({ page }) => {
    await page.goto(`${UI_URL}signup`);

    expect(
      page.getByRole("heading", {
        name: "Create Account",
      })
    );
    const randomId = Math.floor(Math.random() * 90000) + 10000;

    const testName = `test_user_${randomId}`;
    const testEmail = `test_register_${randomId}@test.com`;
    const testPassword = `Pass@${randomId}`;
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="name"]', testName);
    await page.fill('input[name="password"]', testPassword);
    await page.click('button[type="submit"]');

    await expect(page.getByText("Account created!")).toBeVisible();

    await expect(page).toHaveURL(`http://localhost:5173/login`);

    await expect(page.getByText("Welcome Back")).toBeVisible();

    expect(
      page.getByRole("heading", {
        name: "Welcome Back",
      })
    );

    await page.fill('input[name="email"]', testEmail);

    await page.fill('input[name="password"]', testPassword),
      await page.getByRole("button", { name: "Sign in" }).click();

    // await expect(page.getByText("user logged in successfuly")).toBeVisible({
    //   timeout: 5000,
    // });
    // await expect(page.getByText("user logged in successfuly"));

    await page.goto(`${UI_URL}dashboard`);
    expect(
      page.getByRole("heading", {
        name: "Welcome to your dashboard",
      })
    );

    await page.goto(UI_URL);

    const title = page.getByText("SHARE BOARD");
    await title.isVisible();
    const avatar = page.locator(`img[alt='${testName}']`);

    await avatar.click();

    await expect(page.getByText(testName)).toBeVisible();
    await expect(page.getByText(testEmail)).toBeVisible();

    const logoutBtn = page.getByRole("menuitem").filter({ hasText: "Logout" });
    await logoutBtn.click();

    await expect(page.getByText("Log out")).toBeVisible();
    await expect(page).toHaveURL(`${UI_URL}login`);

    await expect(avatar).toHaveCount(0);
  });
});
