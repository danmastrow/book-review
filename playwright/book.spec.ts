import { test, expect } from '@playwright/test';

test('Clicking on a book preview navigates to the book page', async ({ page }) => {
  const baseUrl = process.env.BASE_URL
  if (!baseUrl) {
    throw new Error('BASE_URL environment variable is not set');
  }
  await page.goto(baseUrl);

  await page.waitForSelector('[data-testid="book-preview"]');

  const firstBook = page.locator('[data-testid="book-preview"]').first();
  expect(firstBook).toBeTruthy();

  const bookTitle = await firstBook.locator('[data-testid="book-title"]').textContent();
  const bookAuthor = await firstBook.locator('[data-testid="book-author"]').textContent();

  expect(bookTitle).toBeTruthy();
  expect(bookAuthor).toBeTruthy();

  await firstBook.locator('a').click();
  await page.waitForURL('/books/**');

  await expect(page).toHaveTitle(`${bookTitle} | Book Review`);

  await expect(page.locator('h2')).toHaveText(bookTitle!);
  await expect(page.locator('h3')).toContainText(bookAuthor!);

  await expect(page.locator('h4:has-text("Reviews")')).toBeVisible();
});