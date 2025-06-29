import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/David Castro/);
});

test('navigation works', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // Check if the page loads without errors
  await expect(page.locator('body')).toBeVisible();

  // Check if main content is present
  await expect(page.locator('main')).toBeVisible();
});
