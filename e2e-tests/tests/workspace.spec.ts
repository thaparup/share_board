import {
  test,
  expect,
  chromium,
  BrowserContext,
  Cookie,
} from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should log in and create workspace", async ({ page }) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  try {
    const loginPage = await context.newPage();
    await loginPage.goto(`${UI_URL}login`);

    await loginPage.fill('input[name="email"]', "rupesh@gmail.com");
    await loginPage.fill('input[name="password"]', "password");
    await loginPage.getByRole("button", { name: "Sign in" }).click();

    await loginPage.waitForNavigation();
    const cookies: Cookie[] = await context.cookies();
    console.log("Cookies after login:", cookies);

    await context.addCookies(cookies);

    const workspacePage = await context.newPage();
    await workspacePage.goto(`${UI_URL}workspaces`);

    const createButton = workspacePage.getByRole("button", {
      name: "Create Workspace",
    });
    await expect(createButton).toBeVisible({ timeout: 3000 });

    await createButton.click();

    const inputPlaceholder = workspacePage.getByRole("textbox", {
      name: "Give Your Workspace A Name",
    });
    await expect(inputPlaceholder).toBeVisible();

    const inputName = workspacePage.locator('input[name="name"]');
    await inputName.fill("new workspace");

    const submitButton = workspacePage.getByRole("button", { name: "Create" });
    await submitButton.click();

    await expect(workspacePage.getByText("Workspace created!")).toBeVisible();
  } catch (err) {
    console.error(err.message);
    await browser.close();
    throw err;
  }

  await browser.close();
});
